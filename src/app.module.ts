import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantsModule } from './tenants/tenants.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MongoDbUrl ?? "", {
    connectionName: 'MASTER_DB',
  }), TenantsModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
