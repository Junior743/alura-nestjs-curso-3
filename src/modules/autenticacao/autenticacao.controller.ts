import { AutenticaDto } from './dto/autentica.dto';
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, senha }: AutenticaDto) {
    return this.autenticacaoService.login(email, senha);
  }
}
