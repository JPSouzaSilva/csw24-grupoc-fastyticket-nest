import { Body, Controller, Delete, Post, Put, UseGuards, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
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
    example: {
      message: 'Tenant created successfully.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
    example: {
      message: 'The data provided for creating a tenant is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
    example: {
      message: 'Unauthorized.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
      message: 'Internal server error.',
    }
  })
  @ApiBody({
    description: 'Data for creating a tenant',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Xanflis' },
        contactInfo: { type: 'string', example: 'xanflis@email.com' },
        paymentPreference: { type: 'string', example: 'Bitcoin' },
        notification: { type: 'boolean', example: true }
      },
      required: ['name']
    }
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
    example: {
      summary: 'Success response',
      value: {
        tenantId: '123',
        name: 'Xanflis 2',
        contactInfo: 'xanflis2@email.com',
        paymentPreference: 'Credito',
        notification: false
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
    example: {
      message: 'The data provided for the update is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
    example: {
      message: 'User is not authorized.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
      message: 'Internal server error.',
    }
  })
  @ApiBody({
    description: 'Data for updating the tenant',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Xanflis 2' },
        contactInfo: { type: 'string', example: 'xanflis2@email.com' },
        paymentPreference: { type: 'string', example: 'Credito' },
        notification: { type: 'boolean', example: true }
      }
    }
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
    example: {
      message: 'Tenant deleted successfully.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request for deleting the tenant.',
    example: {
      message: 'The data provided for deleting the tenant is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'request denied.',
    example: {
      message: 'Unauthorized.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
      message: 'Internal server error.',
    }
  })
  
  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return this.tenantService.delete(id)
  }
}
