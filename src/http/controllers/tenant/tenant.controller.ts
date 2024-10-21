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
    summary: 'Criar Novo Tenant',
    description: 'Cria um novo tenant com os dados fornecidos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant criado com sucesso.',
    example: {
      summary: 'Resposta de sucesso',
      value: {
        id: '123',
        name: 'Fulano da Silva',
        contactInfo: 'fulano@email.com',
        specConfig: {
          pagamento: 'Pix',
          notification: true
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.'
  })
  @ApiBody({
    description: 'Dados para criação de um novo tenant',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Fulano da Silva' },
        description: { type: 'string', example: 'Descrição do tenant' },
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
    summary: 'Atualizar um Tenant',
    description: 'Atualiza os dados de um tenant existente por ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant atualizado com sucesso.',
    example: {
      summary: 'Resposta de sucesso',
      value: {
        id: '123',
        name: 'Fulano Atualizado',
        contactInfo: 'fulanoatual@email.com',
        specConfig: {
          pagamento: 'Cartão',
          notification: false
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualização.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant não encontrado.',
  })
  @ApiBody({
    description: 'Dados para atualização do tenant',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Fulano Atualizado' },
        description: { type: 'string', example: 'Nova descrição' },
      },
    },
  })
  @Put(':id/update')
  async update(@Body() data: UpdateTenantDTO, id: string) {
    return this.tenantService.update(id, data)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Deletar um Tenant',
    description: 'Deleta um tenant existente por ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant deletado com sucesso.',
    example: {
      summary: 'Resposta de sucesso',
      value: {
        message: 'Tenant deletado com sucesso.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant não encontrado.',
  })
  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return this.tenantService.delete(id)
  }
}
