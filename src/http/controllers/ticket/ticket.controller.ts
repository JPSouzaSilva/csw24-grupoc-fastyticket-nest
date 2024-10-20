import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Criar Ticket',
    description: 'Cria um novo ticket para um evento.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ticket criado com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        ticketId: '1',
        eventoId: '123',
        tenantId: '456',
        precoOriginal: 150.0,
        idDoVendedor: '789',
        codigoUnicoDeVerificacao: 'abc123',
        status: 'disponível'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
  })
  @ApiBody({
    description: 'Dados para criação de um ticket',
    required: true,
    type: CreateTicketDto,
    schema: {
      type: 'object',
      properties: {
        eventoId: { type: 'string', example: 'dca47c02-59ca-4e4d-91f7-df2d5e09e558' },
        tenantId: { type: 'string', example: '0f4a1f51-ddf4-4acd-99f3-2f7ad2fe8889' },
        precoOriginal: { type: 'number', example: '150.0' },
        idVendedor: { type: 'string', example: 'ff16c948-40b4-45e2-baf0-e2bd8db42aaf' },
        codigoDeVerificacao: { type: 'string', example: 'a7dd59b9-35a2-40b0-bc9d-71c262f719b9' },
        status: { type: 'string', example: 'disponível' }
      }
    }
  })
  @Post('create')
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req.user)
  }

  @ApiOperation({
    summary: 'Buscar Tickets por Evento',
    description: 'Busca todos os tickets de um evento.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tickets listados com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: [
        {
          ticketId: '1',
          eventoId: '123',
          tenantId: '321',
          precoOriginal: 150.0,
          idDoVendedor: '111',
          codigoUnicoDeVerificacao: 'abc123',
          status: 'disponível'
        }
      ]
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum ticket encontrado para o evento.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador do Evento',
    example: '123'
  })
  @Get('event/:id')
  findById(@Param('id') id: string) {
    return this.ticketService.findByEventId(id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Comprar Ticket',
    description: 'Compra de um ticket',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket comprado com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        message: 'Compra realizada com sucesso.',
        ticketId: '1',
        compradorId: 'user123'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para a compra.',
  })
  @ApiBody({
    description: 'Dados para a compra do ticket',
    required: true,
    type: TicketBuyDto,
    schema: {
      type: 'object',
      properties: {
        ticketId: { type: 'string', example: 'ec9198ad-824e-4fde-bbca-90de6f87e67f' },
        compradorId: { type: 'string', example: '13ac707c-9e38-4317-a71a-9db3268b13ba' }
      }
    }
  })
  @Post('buy')
  buyTicket(@Request() req, @Body() buyTicketDTO: TicketBuyDto) {
    return this.ticketService.buyTicket(buyTicketDTO, req.user)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Autenticar Ticket',
    description: 'Autentica um ticket pelo seu código de verificação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket autenticado com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        ticketId: '1',
        autenticado: true,
        mensagem: 'Ticket autenticado com sucesso.'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para autenticação.',
  })
  @ApiBody({
    description: 'Dados para autenticação do ticket',
    required: true,
    type: AuthenticTicketDto,
    schema: {
      type: 'object',
      properties: {
        ticketId: { type: 'string', example: '3890588c-43be-4ce0-bedd-51435fc69fb2' },
        codigoUnicoDeVerificacao: { type: 'string', example: '127f2498-d497-4047-b16b-d2c51e79424a' }      
      }
    }
  })
  @Put('authenticate')  
  authenticTicket(@Body() authenticTicketDto: AuthenticTicketDto) {
    return this.ticketService.authenticate(authenticTicketDto)
  }
}
