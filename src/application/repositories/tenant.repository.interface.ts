import type { Tenant } from '../models/Tenant'

export abstract class ITenantRepository {
  abstract create(tenant: Tenant): Promise<Tenant>
  abstract findAll(): Promise<Tenant[]>
  abstract findById(id: string): Promise<Tenant | null>
  abstract update(id: string, tenant: Tenant): Promise<Tenant | null>
  abstract delete(id: string): Promise<boolean>
}
