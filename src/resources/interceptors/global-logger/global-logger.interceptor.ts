import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

import { RequisicaoComUsuario } from '../../../modules/autenticacao/autenticacao.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private consoleLogger: ConsoleLogger) {}

  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = contexto.switchToHttp();
    const resposta = contextoHttp.getResponse<Response>();
    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();
    const { statusCode } = resposta;
    const { path, method } = requisicao;

    this.consoleLogger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.consoleLogger.log(
            `Rota acessada pelo usuário: ${requisicao.usuario.sub}`,
          );
        }

        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
        this.consoleLogger.log(
          `Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}ms`,
        );
      }),
    );
  }
}
