import { createParamDecorator } from '@nestjs/common'

export const UserRequest = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  return data ? user && user[data] : user
})
