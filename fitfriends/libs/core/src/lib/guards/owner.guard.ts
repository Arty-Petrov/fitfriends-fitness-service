import { AuthorizeOwner } from '@fitfriends/shared-types';
import { CanActivate, ExecutionContext, mixin, Type, UnauthorizedException } from '@nestjs/common';

export const OwnerGuard = (
  service: AuthorizeOwner,
  param: string
): Type<CanActivate> => {
  class OwnerGuardMixin {
    async canActivate(context: ExecutionContext) {
      const getUserId = (context: ExecutionContext) => {
        let request: Request;
        if (context.getType() === 'rpc') {
          request = context.switchToRpc().getData().getBody();
        } else if (context.getType() === 'http') {
          request = context.switchToHttp().getRequest();
        }
        console.log(request)
        return {
          userId: request['user']['sub'],
          // itemId: request[this.param],
        };
      };

      const { userId} = getUserId(context);
      if (!userId) {
        throw new UnauthorizedException();
      }
      return true;//service.isOwner(userId, itemId);
    }
  }
  return mixin(OwnerGuardMixin);
};
