import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, ShopModule, ProductModule],
})
export class AppModule {}
