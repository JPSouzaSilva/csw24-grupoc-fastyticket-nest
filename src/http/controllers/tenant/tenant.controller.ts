import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TenantService } from 'src/application/services/tenant/tenant.service'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateTenantDTO } from 'src/http/dtos/tenant/create.tenant.dto'
import { UpdateTenantDTO } from 'src/http/dtos/tenant/update.tenant.dto'

@Controller('tenant')
@ApiTags('Tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOperation({
    summary: 'Create New Tenant',
    description: 'Creates a new tenant with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Data for creating a tenant',
    required: true,
    type: CreateTenantDTO,
  })
  @Post('create')
  async create(@Body() data: CreateTenantDTO) {
    return this.tenantService.create(data)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update Tenant',
    description: 'Updates the data of an existing tenant by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Data for updating the tenant',
    required: true,
    type: UpdateTenantDTO,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Xanflis 2' },
        contactInfo: { type: 'string', example: 'xanflis2@email.com' },
        paymentPreference: { type: 'string', example: 'Credito' },
        notification: { type: 'boolean', example: true },
      },
    },
  })
  @Put(':id/update')
  async update(@Body() data: UpdateTenantDTO, id: string) {
    return this.tenantService.update(id, data)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete a Tenant',
    description: 'Deletes an existing tenant by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request for deleting the tenant.',
  })
  @ApiResponse({
    status: 401,
    description: 'request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Delete(':id/delete')
  async delete(id: string) {
    return this.tenantService.delete(id)
  }
}
