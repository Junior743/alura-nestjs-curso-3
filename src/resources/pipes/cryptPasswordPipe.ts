import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  transform(senha: string) {
    const sal = this.configService.get<string>('SAL_SENHA');

    if (!sal)
      console.error(
        'Não foi possível pegar o sal para a criptografia da senha',
      );

    return sal ? bcrypt.hash(senha, sal) : bcrypt.hash(senha, 10);
  }
}
