import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { message: string | string[] };

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as { message: string | string[] }).message,
      path: request.url,
    });
  }
}
