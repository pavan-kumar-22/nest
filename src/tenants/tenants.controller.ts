import { Body,Controller, Get, Param, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('admin/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}
  @Post()
  async createTenant(@Body() body: { name: string; slug: string }) {
    return await this.tenantsService.createTenant(body.name, body.slug);
  }
  @Get(':slug')
  async getTenantBySlug(@Param('slug') slug: string) {
    return await this.tenantsService.findBySlug(slug);
  }
}