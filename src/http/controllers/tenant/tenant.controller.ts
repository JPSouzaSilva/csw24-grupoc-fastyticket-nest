import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TenantService } from 'src/application/services/tenant/tenant.service'
import { Roles } from 'src/decorator/roles.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateTenantDTO } from 'src/http/dtos/tenant/create.tenant.dto'
import { UpdateTenantDTO } from 'src/http/dtos/tenant/update.tenant.dto'
import { Role } from 'src/lib/role.enum'

@UseGuards(AuthGuard)
@Roles(Role.ADMIN)
@Controller('tenant')
@ApiTags('Tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  @Post('create')
  async create(@Body() data: CreateTenantDTO) {
    return this.tenantService.create(data)
  }

  @Put(':id/update')
  async update(@Body() data: UpdateTenantDTO, id: string) {
    return this.tenantService.update(id, data)
  }

  @Delete(':id/delete')
  async delete(id: string) {
    return this.tenantService.delete(id)
  }
}
