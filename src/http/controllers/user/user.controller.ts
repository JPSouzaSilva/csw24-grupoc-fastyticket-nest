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
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { UserService } from 'src/application/services/user/user.service'
import { RegisterUserDto } from 'src/http/dtos/user/register.user.dto'
import { NotificationService } from 'src/application/services/notification/notification.service'
import { AuthGuard } from 'src/guard/auth.guard'
import { ReturnRegisterUserDto } from 'src/http/dtos/user/register-return.dto'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiOperation({
    summary: 'User Login',
    description: 'Performs user login in the application.'
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: LoginDto,
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbWUifQ.bt-F3HkbV-vz7IzKJfik_8grERv-YAxsR2j8c-sqNLM'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Request',
    example: {
        message: 'User not found.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
        message: 'Internal server error.'
    }
  })
  @ApiBody({
    description: 'Username and email for authentication',
    required: true,
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'User Profile',
    description: 'User profile information.'
  })
  @ApiResponse({
    status: 200,
    description: 'User Information',
    example: {
            id: 1,
            name: 'example',
            email: 'example@email.com',
            role: 'admin',
            tenantId: 'clj0f5w9b0000ldqk8zse72y4',
            rate: 5,
            balance: 200.0
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
    example: {
        message: 'The provided user profile data is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
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
  @Get('profile')
  async getUser(@UserRequest() req) {
    const verified = req.email.concat(req.username).concat(req.tenantId)
    return this.userService.findByVerified(verified)
  }

  @ApiOperation({
    summary: 'New User Registration',
    description: 'Creates a new user with the provided data.'
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: ReturnRegisterUserDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
    example: {
        message: 'The data provided for user registration is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
    example: {
        message: 'User not authorized.',
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
    description: 'User data for registration',
    required: true,
    type: RegisterUserDto
  })
  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.userService.register(data)
  }


  @UseGuards(AuthGuard)
  @Post('register/admin')
  async registerAdmin(@UserRequest() req, @Body() data: RegisterUserDto) {
    return this.userService.registerAdmin(data, req)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'User Balance',
    description: 'User balance information.',
  })
  @ApiResponse({
    status: 200,
    description: 'User Balance',
    example: {
      balance: 200.0
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
    example: {
        message: 'The provided user data is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
    example: {
        message: 'Unauthorized.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
        message: 'Internal server error.',
    }
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
        message: 'Successful response'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
    example: {
        message: 'The data provided to update the preferences is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Access denied.',
    example: {
        message: 'Unauthorized.'
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
    description: 'User preferences data',
    required: true,
    schema: {
      properties: {
        notifications: { type: 'boolean', example: true }
      }
    }
  })
  @Put('preferences')
  async preferences(
    @UserRequest() req,
    @Query('notify', ParseBoolPipe) notify: boolean,
  ) {
    return this.notificationService.preference(req.id, notify)
  }
}
