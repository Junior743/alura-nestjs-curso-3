import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ItemPedidoEntity } from '../pedido/itempedido.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0, nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ length: 255, nullable: false })
  descricao: string;

  @Column({ length: 100, nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImagemEntity) => produtoImagemEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[];

  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[];
}
