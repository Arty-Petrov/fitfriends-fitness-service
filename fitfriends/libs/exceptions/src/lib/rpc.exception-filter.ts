import { ArgumentsHost, Catch, HttpException, HttpStatus, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RPCExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    // console.log('RpcException context data', ctx.getContext().content.toString()) 
    console.log('RpcException status', exception ) 
    console.log('RpcException error', exception.message)

    const response = ctx.getResponse<Response>();
    // const request = ctx.getData().request;
    const status = exception.getError()['status'];
    const message = exception.message;
    // const body = request.body;

    // console.log('RpcException request', request)
    // console.log('RpcException response', response)
    // console.log('RpcException status', status)
    // console.log('RpcException message', message)
    // console.log('RpcException body', message)
    // response
      // .status(status),
      // .json({
        // statusCode: status,
        // message,
        // date: new Date().toISOString(),
        // resource: request.url,
        // sourceData: body
      // });
    console.log('RpcException response', response)
    return throwError(() => new HttpException('som error', HttpStatus.NOT_FOUND));
  }
}
