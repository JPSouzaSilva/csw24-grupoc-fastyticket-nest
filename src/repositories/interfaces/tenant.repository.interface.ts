import { Prisma, Tenant } from '@prisma/client'

export interface ITenantRepository {
  create(data: Prisma.TenantCreateInput): Promise<Tenant>
  findAll(): Promise<Tenant[]>
  findById(id: string): Promise<Tenant>
  update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant>
  delete(id: string): Promise<boolean>
}
