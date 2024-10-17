import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from 'src/http/dtos/Login.dto'
import { UserService } from 'src/services/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @UseGuards(AuthGuard('jwt'))
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
}
