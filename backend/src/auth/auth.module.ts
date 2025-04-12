import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma.module';
import { AuthController } from './auth.controller.';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
