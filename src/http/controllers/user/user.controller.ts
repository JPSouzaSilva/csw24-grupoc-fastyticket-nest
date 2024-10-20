import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common'
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { UserService } from 'src/application/services/user/user.service'
import { RegisterUserDto } from 'src/http/dtos/user/register.user.dto'
import { NotificationService } from 'src/application/services/notification/notification.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUser(@UserRequest() req) {
    return this.userService.findByEmailOrUsername(req.name, req.email)
  }

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.userService.register(data)
  }

  @UseGuards(AuthGuard)
  @Put('preferences')
  async preferences(@UserRequest() req, @Query('notify') notify: boolean) {
    return this.notificationService.preference(req.id, notify)
  }
}
