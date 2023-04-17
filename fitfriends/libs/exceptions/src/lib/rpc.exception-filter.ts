import { ArgumentsHost, Catch, HttpException, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RPCExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc();

    const response = ctx.getData().response;
    const request = ctx.getData().request;
    const status = exception.getError();
    const message = exception.message;
    const body = request.body;

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        date: new Date().toISOString(),
        resource: request.url,
        sourceData: body
      });
    return throwError(() => new HttpException(response, response.status));
  }
}
