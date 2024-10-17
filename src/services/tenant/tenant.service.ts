import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TenantRepository } from 'src/repositories/tenant/tenant.repository'

@Injectable()
export class TenantService {
  private readonly tenantRepository: TenantRepository
  constructor(tenantRepository: TenantRepository) {
    this.tenantRepository = tenantRepository
  }

  async findAll() {
    return this.tenantRepository.findAll()
  }

  async findById(id: string) {
    return this.tenantRepository.findById(id)
  }

  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.tenantRepository.update(id, data)
  }

  async delete(id: string) {
    return this.tenantRepository.delete(id)
  }

  async create(data: Prisma.TenantCreateInput) {
    return this.tenantRepository.create(data)
  }
}
