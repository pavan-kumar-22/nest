import { Injectable, BadGatewayException } from '@nestjs/common';

import { Tenant, TenantDocument } from './schemas/tenant.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TenantsService {
    constructor(
        @InjectModel(Tenant.name, 'MASTER_DB') private tenantModel: Model<TenantDocument>,
    ) {}

    async createTenant(name: string, slug: string){
        slug = slug.toLowerCase().trim();

        const existingTenant = await this.tenantModel.findOne({ slug });
        if (existingTenant) {
            throw new BadGatewayException('Tenant with this slug already exists');
        }
        const dbName = `tenant_${slug.replace(/[^a-zA-Z0-9]/g, '_')}`;

        const newTenant = new this.tenantModel({
            name,
            slug,
            dbName,
            active: true,
        });  
        return await newTenant.save();
    }
    async findBySlug(slug: string){
        return this.tenantModel.findOne({ slug,active:true }).lean();
    }
}
