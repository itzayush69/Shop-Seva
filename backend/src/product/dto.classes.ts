export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  shopId: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  shopId?: number;
}
