import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Query,
  ParseBoolPipe,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { UserService } from 'src/application/services/user/user.service'
import { RegisterUserDto } from 'src/http/dtos/user/register.user.dto'
import { NotificationService } from 'src/application/services/notification/notification.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiOperation({
    summary: 'Login do Usuário',
    description: 'Realiza o login do usuário na aplicação.'
  })
  @ApiResponse({
    status: 200,
    description: 'Login efetuado com sucesso.',
    type: LoginDto,
    example: {
      summary: 'Resposta bem-sucedida',
      value: {
        accessToken: 'jwt_token_exemplo',
        expiresIn: 3600
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição Inválida',
    example: {
      summary: 'Usuário não encontrado',
      value: { message: 'Usuário não encontrado.'}
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro Interno do Servidor'
  })
  @ApiBody({
    description: 'Username e email para Autenticação',
    required: true,
    type: LoginDto,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'exemplo' },
        email: { type: 'string', example: 'exemplo@email.com' }
      }
    }
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Perfil do Usuário',
    description: 'Informações do perfil do usuário.'
  })
  @ApiResponse({
    status: 200,
    description: 'Informações do Usuário',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        id: 1,
        username: 'exemplo',
        email: 'exemplo@email.com'
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado.',
    example: {
      message: 'Token de autenticação inválido ou ausente.'
    }
  })
  @Get('profile')
  async getUser(@UserRequest() req) {
    return this.userService.findByEmailOrUsername(req.name, req.email)
  }

  @ApiOperation({
    summary: 'Registro de Novo Usuário',
    description: 'Cria um novo usuário com os dados fornecidos.'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    example: {
      message: 'Usuário regisrtado com sucesso.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
    example: 'Dados inválidos para registro.'
  })
  @ApiBody({
    description: 'Dados do usuário para registro',
    required: true,
    type: RegisterUserDto,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'fulano' },
        email: { type: 'string', example: 'fulano@email.com' }
      },
      required: ['username', 'email'],
    },
  })
  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.userService.register(data)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Preferências do Usuário',
    description: 'Atualiza as preferências de um usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualizado com sucesso.',
    example: {
      summary: 'Resposta de sucesso'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado.',
    example: {
      message: 'Token de autenticação inválido ou ausente.'
    }
  })
  @ApiBody({
    description: 'Dados de preferências do usuário',
    required: true,
    examples: {
      example1: {
        summary: 'Exemplo de Preferências',
        value: {
          notifications: true
        },
      },
    },
  })
  @Put('preferences')
  async preferences(
    @UserRequest() req,
    @Query('notify', ParseBoolPipe) notify: boolean,
  ) {
    return this.notificationService.preference(req.id, notify)
  }
}
