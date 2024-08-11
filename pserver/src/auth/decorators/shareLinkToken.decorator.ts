import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ShareLinkToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorizationHeader = request.headers['X-Authorization-Share'];
    if (!authorizationHeader) {
      return null;
    }
    const token = authorizationHeader;
    return token;
  },
);
