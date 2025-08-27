import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { ProdutoService } from './produto.service';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    try {
      const produtoCadastrado = await this.produtoService.criaProduto(
        dadosProduto,
      );

      console.log(`Produto cadastrado: ${JSON.stringify(produtoCadastrado)}`);

      return {
        mensagem: 'Produto criado com sucesso.',
        produto: produtoCadastrado,
      };
    } catch (ex: any) {
      console.error(`Erro ao criar produto: ${ex}`);
      throw ex;
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listaTodos() {
    return this.produtoService.listProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaUm(@Param('id') id: string) {
    const produtoSalvo = await this.produtoService.listaUmProduto(id);

    console.log('Produto sendo buscado do BD!');

    return produtoSalvo;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
