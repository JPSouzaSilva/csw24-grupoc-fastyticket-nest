import { Injectable, NotFoundException } from '@nestjs/common'
import { Tenant } from 'src/application/models/Tenant'
import type { ITenantRepository } from 'src/application/repositories/tenant.repository.interface'
import type { CreateTenantDTO } from 'src/http/dtos/tenant/create.tenant.dto'
import type { UpdateTenantDTO } from 'src/http/dtos/tenant/update.tenant.dto'

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async findAll() {
    return this.tenantRepository.findAll()
  }

  async findById(id: string) {
    return this.tenantRepository.findById(id)
  }

  async update(id: string, updateTenantDto: UpdateTenantDTO) {
    const tenant = await this.tenantRepository.findById(id)

    if (!tenant) {
      throw new NotFoundException('Tenant not found')
    }

    const { name, contactInfo, notification, paymentPreference } =
      updateTenantDto

    tenant.name = name ?? tenant.name
    tenant.contactInfo = contactInfo ?? tenant.contactInfo
    tenant.notification = notification ?? tenant.notification
    tenant.paymentPreference = paymentPreference ?? tenant.paymentPreference

    return this.tenantRepository.update(id, tenant)
  }

  async delete(id: string) {
    const tenant = await this.tenantRepository.findById(id)

    if (!tenant) {
      throw new NotFoundException('Tenant not found')
    }

    return this.tenantRepository.delete(id)
  }

  async create(data: CreateTenantDTO) {
    const { name, notification, contactInfo, paymentPreference } = data
    const tenant = new Tenant({
      name,
      notification: notification ?? false,
      contactInfo,
      paymentPreference: paymentPreference ?? '',
    })
    return this.tenantRepository.create(tenant)
  }
}
