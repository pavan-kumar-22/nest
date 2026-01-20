import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TenantConnectionManager } from '../tenants/tenant-connection.manager';
import { ProductSchema } from './entities/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly tenantConnectionManager: TenantConnectionManager) {}

  async create(createProductDto: CreateProductDto, dbName: string) {
    const connection = await this.tenantConnectionManager.getConnection(dbName);
    const ProductModel = connection.model('Product', ProductSchema);
    const product = new ProductModel(createProductDto);
    return await product.save();
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
