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
    const verified = req.email.concat(req.username).concat(req.tenantId)
    return this.userService.findByVerified(verified)
  }

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
  @Get('balance')
  async getBalance(@UserRequest() req) {
    return this.userService.getBalance(req.id)
  }

  @UseGuards(AuthGuard)
  @Put('preferences')
  async preferences(
    @UserRequest() req,
    @Query('notify', ParseBoolPipe) notify: boolean,
  ) {
    return this.notificationService.preference(req.id, notify)
  }
}
