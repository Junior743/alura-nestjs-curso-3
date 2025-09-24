import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';

import { PedidoModule } from './modules/pedido/pedido.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './filters/filtro-de-excecao-global';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';

@Module({
  imports: [
    PedidoModule,
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({ store: await redisStore({ ttl: 60000 }) }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AutenticacaoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
