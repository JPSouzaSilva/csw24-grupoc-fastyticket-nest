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
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
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
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbWUifQ.bt-F3HkbV-vz7IzKJfik_8grERv-YAxsR2j8c-sqNLM'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição Inválida',
    example: {
      message: 'Usuário não encontrado.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro Interno do Servidor',
    example: {
      message: 'Erro interno do servidor.'
    }
  })
  @ApiBody({
    description: 'Username e email para Autenticação',
    required: true,
    type: LoginDto,
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
    status: 400,
    description: 'Dados fornecidos inválidos.',
    example: {
      message: 'Os dados fornecido do perfil do usuário são inválidos.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não autorizado.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
    example: {
      message: 'Erro interno do servidor.',
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
    description: 'Usuário registrado com sucesso.',
    example: {
      message: 'Usuário registrado com sucesso.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
    example: {
      message: 'Os dados fornecido para registrar o usuário são inválidos.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não autorizado.',
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
    description: 'Dados do usuário para registro',
    required: true,
    type: RegisterUserDto
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
      message: 'Resposta de sucesso'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados fornecidos inválidos.',
    example: {
      message: 'Os dados fornecido para atualizar as preferências são inválidos.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
    example: {
      message: 'Usuário não autorizado.'
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
