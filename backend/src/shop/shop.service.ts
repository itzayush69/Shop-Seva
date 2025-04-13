/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Shop } from '@prisma/client';
import { CreateShopDto, UpdateShopDto } from './dto.classes';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  create(createShopDto: CreateShopDto): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.shop.create({
      data: {
        name: createShopDto.name,
        description: createShopDto.description,
      },
    }) as Promise<Shop>;
  }

  findAll(): Promise<
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    (Shop & {
      products: Array<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        shopId: number | null;
      }>;
    })[]
  > {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.shop.findMany({
      include: { products: true },
    });
  }

  findOne(id: number): Promise<
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | (Shop & {
        products: Array<{
          id: number;
          name: string;
          description: string;
          price: number;
          stock: number;
          createdAt: Date;
          shopId: number | null;
        }>;
      })
    | null
  > {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.shop.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.shop.update({
      where: { id },
      data: {
        // Only update fields that are provided.
        ...(updateShopDto.name !== undefined && { name: updateShopDto.name }),
        ...(updateShopDto.description !== undefined && {
          description: updateShopDto.description,
        }),
      },
    });
  }

  remove(id: number): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.shop.delete({
      where: { id },
    });
  }
}
