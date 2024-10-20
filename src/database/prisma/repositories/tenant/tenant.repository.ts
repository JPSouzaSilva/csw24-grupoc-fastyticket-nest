import { Injectable } from '@nestjs/common'
import type { ITenantRepository } from 'src/application/repositories/tenant.repository.interface'
import type { PrismaService } from '../../prisma.service'
import { Tenant } from 'src/application/models/Tenant'
import { TenantMapper } from '../../mappers/tenant/tenant.mapper'

@Injectable()
export class TenantRepository implements ITenantRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(tenant: Tenant): Promise<Tenant> {
    const toPersistence = TenantMapper.toPersistence(tenant)

    const createdTenant = await this.prisma.tenant.create({
      data: toPersistence,
    })

    return TenantMapper.toDomain(createdTenant)
  }

  async findAll(): Promise<Tenant[]> {
    const tenants = await this.prisma.tenant.findMany()

    return tenants.map((tenant) => TenantMapper.toDomain(tenant))
  }

  async findById(id: string): Promise<Tenant | null> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        tenantId: id,
      },
    })

    if (!tenant) {
      return null
    }

    return TenantMapper.toDomain(tenant)
  }

  async update(id: string, tenant: Tenant): Promise<Tenant | null> {
    const toPersistence = TenantMapper.toPersistence(tenant)

    const updatedTenant = await this.prisma.tenant.update({
      where: {
        tenantId: id,
      },
      data: toPersistence,
    })

    return TenantMapper.toDomain(updatedTenant)
  }

  async delete(id: string): Promise<boolean> {
    const tenant = await this.prisma.tenant.delete({
      where: {
        tenantId: id,
      },
    })

    return !!tenant
  }
}
