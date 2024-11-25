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
import { UserRequest } from 'src/decorator/user.decorator'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { UserService } from 'src/application/services/user/user.service'
import { RegisterUserDto } from 'src/http/dtos/user/register.user.dto'
import { NotificationService } from 'src/application/services/notification/notification.service'
import { AuthGuard } from 'src/guard/auth.guard'
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiOperation({
    summary: 'User Login',
    description: 'Performs user login in the application.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: LoginDto,
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbWUifQ.bt-F3HkbV-vz7IzKJfik_8grERv-YAxsR2j8c-sqNLM',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiBody({
    description: 'Username, email and tenantId for authentication',
    required: true,
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @Get('test')
  async test() {
    return {
      isBase64Encoded: false,
      statusCode: 200,
      statusDescription: '200 OK',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello World!',
      }),
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get User ',
    description: 'Performs user login in the application.',
  })
  @ApiResponse({
    status: 200,
    description: 'User Information',
    example: {
      _id: 'eaa0fd1c-392b-4491-ac50-accb5967b2fc',
      props: {
        email: 'joao@email1.com',
        name: 'joao',
        role: 'USER',
        tenantId: '123',
        rate: null,
        balance: 0,
        verified: 'joao@email1.comjoao123',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get('profile')
  async getUser(@UserRequest() req) {
    const verified = req.email.concat(req.username).concat(req.tenantId)
    return this.userService.findByVerified(verified)
  }

  @ApiOperation({
    summary: 'New User Registration',
    description: 'Creates a new user with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    example: {
      _id: 'eaa0fd1c-392b-4491-ac50-accb5967b2fc',
      props: {
        email: 'joao@email1.com',
        name: 'joao',
        role: 'USER',
        tenantId: '123',
        rate: null,
        balance: 0,
        verified: 'joao@email1.comjoao123',
      },
    },
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
    description: 'User data for registration',
    required: true,
    type: RegisterUserDto,
  })
  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.userService.register(data)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'New Admin Registration',
    description: 'Creates a new admin with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully registered.',
    example: {
      _id: 'eaa0fd1c-392b-4491-ac50-accb5967b2fc',
      props: {
        email: 'joao@email1.com',
        name: 'joao',
        role: 'Admin',
        tenantId: '123',
        rate: null,
        balance: 0,
        verified: 'joao@email1.comjoao123',
      },
    },
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
    description: 'User data for registration',
    required: true,
    type: RegisterUserDto,
  })
  @Post('register/admin')
  async registerAdmin(@UserRequest() req, @Body() data: RegisterUserDto) {
    return this.userService.registerAdmin(data, req)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get User Balance',
    description: 'User balance information.',
  })
  @ApiResponse({
    status: 200,
    description: 'User Balance',
    example: {
      balance: 200.0,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get('balance')
  async getBalance(@UserRequest() req) {
    return this.userService.getBalance(req.id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'User Preferences',
    description: 'Updates preferences of a user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully.',
    example: {
      _id: '6d904338-bd26-4dfc-8f48-411584692590',
      props: {
        userId: 'eaa0fd1c-392b-4491-ac50-accb5967b2fc',
        receiveEmail: true,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiQuery({
    name: 'notify',
    description: 'Notify preferences',
    required: true,
    type: Boolean,
  })
  @Put('preferences')
  async preferences(
    @UserRequest() req,
    @Query('notify', ParseBoolPipe) notify: boolean,
  ) {
    return this.notificationService.preference(req.id, notify)
  }
}
