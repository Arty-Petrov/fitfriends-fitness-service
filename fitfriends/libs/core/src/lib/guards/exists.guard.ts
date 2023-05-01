import { DocumentExists } from '@fitfriends/shared-types';
import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(@Inject('EXISTS_SERVICE') private service: DocumentExists) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> {
    const requestData = this.getRequestData(context);
    const itemId = requestData['itemId'];
    return this.service.exists(itemId);
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

