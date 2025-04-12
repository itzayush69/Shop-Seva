import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup/user')
  signupUser(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.signupUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: 'USER',
    });
  }

  @Post('signup/seller')
  signupSeller(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      shopName: string;
    },
  ) {
    return this.authService.signupSeller({
      name: body.name,
      email: body.email,
      password: body.password,
      shopName: body.shopName,
      role: 'SELLER',
    });
  }

  @Post('signin')
  signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin({
      email: body.email,
      password: body.password,
    });
  }
}
