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

    }

}
