import { AuthorizeOwner } from '@fitfriends/shared-types';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(@Inject('SERVICE') private service: AuthorizeOwner) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> {
    const requestData = this.getRequestData(context);
    console.log(requestData)
    const userId = requestData['user']['sub'];
    const itemId = requestData['body']['id'];
    console.log(userId, itemId)
    return this.service.isOwner(userId, itemId);
  }

  private getRequestData(context: ExecutionContext) {
    let requestData: string;
    if (context.getType() === 'rpc') {
      requestData = context.switchToRpc().getData().request;
    } else if (context.getType() === 'http') {
      requestData = context.switchToHttp().getRequest();
    }
    if (!requestData) {
      throw new HttpException(
        'No value was provided to check ownership',
        HttpStatus.NO_CONTENT
      );
    }
    return requestData;
  }
}

