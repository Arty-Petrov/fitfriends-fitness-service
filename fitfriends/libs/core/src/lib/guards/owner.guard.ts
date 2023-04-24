import { AuthorizeOwner } from '@fitfriends/shared-types';
import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(@Inject('SERVICE') private service: AuthorizeOwner) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> {
    const requestData = this.getRequestData(context);
    const userId = requestData['authorId'];
    const itemId = requestData['id'];
    return this.service.isOwner(userId, itemId);
  }

  private getRequestData(context: ExecutionContext) {
    const requestData = context.switchToRpc().getData();
    if (!requestData) {
      throw new RpcException({
        message: 'No value was provided to check ownership',
        status: HttpStatus.NO_CONTENT
      });
    }
    return requestData;
  }
}

