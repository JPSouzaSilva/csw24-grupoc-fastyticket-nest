import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserRequest = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    // Retorna a propriedade específica ou o objeto `user` completo.
    return data ? user?.[data] : user
  },
)
