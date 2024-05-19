import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch(RpcException)
export class RpcCustomExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const rcpError = exception.getError() as any;

    if (
      typeof rcpError === 'object' &&
      rcpError.hasOwnProperty('status') &&
      rcpError.hasOwnProperty('message')
    ) {
      const status = isNaN(rcpError.status) ? 500 : rcpError.status;
      return response.status(status).json({
        time: new Date().toISOString(),
        path: request.path,
        error: rcpError.response ? rcpError.response : rcpError,
      });
    }

    return response.status(500).json({
      time: new Date().toISOString(),
      path: request.path,
      error: rcpError,
    });
  }
}
