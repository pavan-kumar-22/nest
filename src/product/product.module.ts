
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TenantConnectionManager } from '../tenants/tenant-connection.manager';

@Module({
  controllers: [ProductController],
  providers: [ProductService, TenantConnectionManager],
})
export class ProductModule {}
