import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import { Roles } from 'src/decorator/roles.decorator'
import { Role } from 'src/lib/role.enum'
@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Criar Evento',
    description: 'Criação de um novo evento por um admin.',
  })
  @ApiResponse({
    status: 201,
    description: 'Evento criado com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        eventId: '1',
        tenantId: '123',
        nomeDoEvento: 'Numanice',
        tipo: 'show',
        localizacao: 'Parque Harmonia'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não possui permissão para criar eventos.'
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
    summary: 'Listar Eventos',
    description: 'Lista todos os eventos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Eventos listados com sucesso.',
    example: {
      summary: 'Resposta de sucesso',
      value: [
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
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Consulta inválida.',
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
