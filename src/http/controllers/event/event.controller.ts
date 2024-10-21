import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'

@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: 'Criar Evento',
    description: 'Criação de um novo evento por um admin.',
  })
  @ApiResponse({
    status: 201,
    description: 'Evento criado com sucesso.',
    example: {
      message: 'Evento criado com sucesso.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
    example: {
      message: 'Dados fornecidos para criação de um evento são inválidos.'
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não possui permissão para criar eventos.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    example: {
      message: 'Erro interno do servidor.'
    }
  })
  @ApiBody({
    description: 'Dados para criação de um evento',
    required: true,
    type: CreateEventDto,
    schema: {
      type: 'object',
      properties: {
        nomeDoEvento: { type: 'string', example: 'Numanice' },
        tipo: { type: 'string', example: 'show' },
        localizacao: { type: 'string', example: 'Parque Harmonia' }
      }
    }
  })
  @Post('create')
  async create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto, req.user)
  }

  @ApiOperation({
    summary: 'Atualizar Evento',
    description: 'Atualiza as informações de um evento já cadastrado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado com sucesso.',
    example: {
      message: 'Evento atualizado com sucesso.',
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
    example: {
      message: 'Os dados fornecidos para atualização são inválidos.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não possui permissão para atualizar eventos.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    example: {
      message: 'Erro interno do servidor.',
    }
  })
  @ApiBody({
    description: 'Dados para atualização do evento',
    required: true,
    type: UpdateEventDTO,
    schema: {
      type: 'object',
      properties: {
        nomeDoEvento: { type: 'string', example: 'Numanice 2' },
        tipo: { type: 'string', example: 'show' },
        localizacao: { type: 'string', example: 'Parque Farroupilha' },
      }
    }
  })
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateEventDto: UpdateEventDTO,
  ) {
    return this.eventService.update(id, updateEventDto, req.user)
  }

  @ApiOperation({
    summary: 'Deletar Evento',
    description: 'Deleta um evento existente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Evento deletado com sucesso.',
    example: {
      message: 'Evento deletado com sucesso.',
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida para deletar o evento.',
    example: {
      message: 'Os dados fornecidos para deletar o evento são inválidos.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não possui permissão para deletar eventos.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    example: {
      message: 'Erro interno do servidor.',
    }
  })
  @Delete(':id/delete')
  async delete(@Param('id') id: string, @Request() req) {
    return this.eventService.delete(id, req.user)
  }

  @ApiOperation({
    summary: 'Listar Eventos',
    description: 'Lista todos os eventos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Eventos listados com sucesso.',
    example: [
        {
          eventId: '1',
          tenantId: '123',
          nomeDoEvento: 'Numanice',
          tipo: 'show',
          localizacao: 'Parque Harmonia'
        },
        {
          eventId: '2',
          tenantId: '456',
          nomeDoEvento: 'Roger Waters',
          tipo: 'show',
          localizacao: 'Arena do Grêmio'
        }
      ]
  })
  @ApiResponse({
    status: 400,
    description: 'Consulta inválida.',
    example: {
      message: 'Consulta inválida.'
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Consulta não autorizada.',
    example: {
      message: 'Usuário não possui permissão para consultar eventos.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    example: {
      message: 'Erro interno do servidor.'
    }
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página. Padrão: 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de itens por página. Padrão: 10',
    example: 10,
  })
  @Get('all')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(Number(page) || 1, Number(limit) || 10)
  }
}
