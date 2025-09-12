import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Cache } from 'cache-manager';
import { ProdutoService } from './produto.service';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(AutenticacaoGuard)
@Controller('produtos')
export class ProdutoController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly produtoService: ProdutoService,
  ) {}

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
    const productCacheID = `produto_${id}`;
    let produto = await this.cacheManager.get<ListaProdutoDTO>(productCacheID);

    if (!produto) {
      produto = await this.produtoService.listaUmProduto(id);
      await this.cacheManager.set(productCacheID, produto);
    }

    return {
      mensagem: 'Produto encontrado.',
      produto,
    };
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
