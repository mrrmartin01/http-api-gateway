import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Request.user is set by the authentication guard/strategy at runtime.
    // We avoid relying on global type augmentation here by using a local cast.
    const user = (request as any).user;
    if (!user) return null;
    return data ? user[data] : user;
  }
);
