import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common'
import type { User } from '@prisma/client'
import { log } from 'console'
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import type { PreferencesDTO } from 'src/http/dtos/preferences.dto'
import { UserService } from 'src/application/services/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    log(loginDto)
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUser(@Request() req) {
    return this.userService.findByEmailOrUsername(
      req.user.username,
      req.user.email,
    )
  }

  @Post('register')
  async register(@Body() data) {
    return this.userService.register(data)
  }

  @UseGuards(AuthGuard)
  @Put('preferences')
  async preferences(@Body() data: PreferencesDTO, @UserRequest() user: User) {
    return this.userService.preferences(data, user)
  }
}
