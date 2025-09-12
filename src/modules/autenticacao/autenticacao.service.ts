import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsuarioService } from '../usuario/usuario.service';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaInserida: string) {
    const errorMessage = 'O email ou a senha está incorreto.';
    const usuario = await this.usuarioService.buscaPorEmail(email);

    if (!usuario) throw new UnauthorizedException(errorMessage);

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) throw new UnauthorizedException(errorMessage);

    const payload: UsuarioPayload = {
      sub: usuario.id, // subject = sujeito
      nomeUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }
}
