import { Body, Controller, Get, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TenantService } from 'src/services/tenant/tenant.service'

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  @Post('create')
  async create(@Body() data: Prisma.TenantCreateInput) {
    return this.tenantService.create(data)
  }

  @Get()
  async findAll() {
    return this.tenantService.findAll()
  }

  @Get(':id')
  async findById(id: string) {
    return this.tenantService.findById(id)
  }

  @Post(':id/update')
  async update(@Body() data: Prisma.TenantUpdateInput, id: string) {
    return this.tenantService.update(id, data)
  }

  @Post(':id/delete')
  async delete(id: string) {
    return this.tenantService.delete(id)
  }
}
