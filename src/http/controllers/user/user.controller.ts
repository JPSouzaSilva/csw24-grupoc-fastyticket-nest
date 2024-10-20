import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { log } from 'console'
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { PreferencesDTO } from 'src/http/dtos/preferences.dto'
import { UserService } from 'src/services/user/user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    log(loginDto)
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  async getUser(@Request() req) {
    return this.userService.findByEmailOrUsername(
      req.user.username,
      req.user.email,
    )
  }

  @ApiOperation({
    summary: 'Registro de Novo Usuário',
    description: 'Cria um novo usuário com os dados fornecidos.'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    example: {
      summary: 'Resposta de Sucesso',
      value: {
        id: 1,
        username: 'fulano',
        email: 'fulano@email.com'
      }
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
  async register(@Body() data) {
    return this.userService.register(data)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
    type: PreferencesDTO,
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
  async preferences(@Body() data: PreferencesDTO, @UserRequest() user: User) {
    return this.userService.preferences(data, user)
  }
}
