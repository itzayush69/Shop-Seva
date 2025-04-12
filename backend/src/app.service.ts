import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signupUser(name: string, email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async signupSeller(
    name: string,
    email: string,
    password: string,
    shopName: string,
  ) {
    const existing = await this.prisma.seller.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Seller already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await this.prisma.seller.create({
      data: { name, email, password: hashedPassword, shopName },
    });

    return { message: 'Seller registered successfully', sellerId: seller.id };
  }
}
