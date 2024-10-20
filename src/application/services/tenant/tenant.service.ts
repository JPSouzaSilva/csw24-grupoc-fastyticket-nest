import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import type { Tenant } from 'src/application/models/Tenant'
import type { ITenantRepository } from 'src/application/repositories/tenant.repository.interface'

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async findAll() {
    return this.tenantRepository.findAll()
  }

  async findById(id: string) {
    return this.tenantRepository.findById(id)
  }

  async update(id: string, tenant: Tenant) {
    return this.tenantRepository.update(id, tenant)
  }

  async delete(id: string) {
    return this.tenantRepository.delete(id)
  }

  async create(data: ) {
    return this.tenantRepository.create(data)
  }
}
