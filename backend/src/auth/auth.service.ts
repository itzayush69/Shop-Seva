import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { SignupSellerDto, SignupUserDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupUser(dto: SignupUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    if (dto.role === 'USER') {
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
      const seller = await this.prisma.seller.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          shopName: dto.shopName,
        },
      });

      return {
        message: 'Seller signup successful',
        sellerId: seller.id,
      };
    }
  }
}
