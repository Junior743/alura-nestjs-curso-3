import { appendFileSync } from 'fs';
import { bgMagenta, white } from 'colors';
import { ConsoleLogger, Injectable } from '@nestjs/common';

import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  formataLog(nome, quantidade, valor) {
    return `LOCAL: ${
      this.context
    } - NOME: ${nome} - QUANTIDADE: ${quantidade} - PREÇO: ${valor} - TIMESTAMP ${this.getTimestamp()}`;
  }

  logColorido(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;
    const logFormatado = this.formataLog(nome, quantidadeDisponivel, valor);

    console.log(bgMagenta(white(logFormatado)));
  }

  logEmArquivo(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;

    const mensagemFormatada =
      this.formataLog(nome, quantidadeDisponivel, valor) + '\n'; //adicionei a quebra de linha pois o appendFileSync não faz isso automaticamente

    const caminhoDoLog = './src/modules/customLogger/arquivo.log';
    appendFileSync(caminhoDoLog, mensagemFormatada);
  }
}
