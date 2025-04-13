import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto.classes';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.productService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.productService.remove(Number(id));
  }
}
