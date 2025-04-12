import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { SigninDto, SignupSellerDto, SignupUserDto } from './dto.classes';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupUser(dto: SignupUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    if (dto.role === 'USER') {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        return {
          message: 'User already exists',
        };
      }

      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });

      return {
        message: 'User signup successful',
        userId: user.id,
      };
    }
  }

  async signupSeller(dto: SignupSellerDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    if (dto.role === 'SELLER') {
      const existingSeller = await this.prisma.seller.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingSeller) {
        return {
          message: 'Seller already exists',
        };
      }

      const seller = await this.prisma.seller.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });

      return {
        message: 'Seller signup successful',
        sellerId: seller.id,
      };
    }
  }

  async signin(dto: SigninDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      user = await this.prisma.seller.findUnique({
        where: {
          email: dto.email,
        },
      });
    }

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Invalid password',
      };
    }

    return {
      message: 'Signin successful',
      userId: user.id,
    };
  }
}
