import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/services/auth/auth.service'
import { UserService } from 'src/services/user/user.service'

@Controller('user')
export class UserController {
  private readonly userService: UserService
  private readonly authService: AuthService

  @Post('login')
  async login(username: string, email: string) {
    return await this.authService.login(username, email)
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@Request() req) {
    return this.userService.findByEmailOrUsername(
      req.user.username,
      req.user.email,
    )
  }
}
