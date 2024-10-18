import { Prisma, Tenant } from '@prisma/client'

export abstract class ITenantRepository {
  abstract create(data: Prisma.TenantCreateInput): Promise<Tenant>
  abstract findAll(): Promise<Tenant[]>
  abstract findById(id: string): Promise<Tenant>
  abstract update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant>
  abstract delete(id: string): Promise<boolean>
}
