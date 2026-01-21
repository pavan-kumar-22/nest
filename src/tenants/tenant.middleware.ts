
import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include tenant
declare module 'express-serve-static-core' {
  interface Request {
    tenant?: any;
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let slug = req.params.slug;
    if (Array.isArray(slug)) {
      slug = slug[0];
    }
    if (!slug) {
      return res.status(400).json({ message: 'Tenant slug is required' });
    }
    const tenant = await this.tenantsService.findBySlug(slug);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    req.tenant = tenant;
    next();
  }
}
