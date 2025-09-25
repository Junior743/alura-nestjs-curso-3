import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { CustomLoggerModule } from 'src/modules/customLogger/custom-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity]), CustomLoggerModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
