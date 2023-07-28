import { ArgumentsHost, Catch, HttpException, HttpStatus, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RPCExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<never> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getError()['status'];
    const message = exception.message;
    return throwError(() => new HttpException('som error', HttpStatus.NOT_FOUND));
  }
}
