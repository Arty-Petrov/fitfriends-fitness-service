import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class UserDataInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const user = this.getRequest(context);
    this.addUser(user, context);
    if (!user) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return next.handle();
  }

  private getRequest(context: ExecutionContext) {
    let request: Request;
    if (context.getType() === 'rpc') {
      request = context.switchToRpc().getData().getRequest();
    } else if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    }
    return {
      ...request['body'],
      id: request['user']['sub'],
      role: request['user']['role'],
      email: request['user']['email']
    };
  }

  private addUser(data: object, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = data;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = data;
    }
  }
}
