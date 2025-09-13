import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraTipoValor1757723244177 implements MigrationInterface {
    name = 'AlteraTipoValor1757723244177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" RENAME COLUMN "preco_venda" TO "precoVenda"`);
        await queryRunner.query(`ALTER TABLE "pedidos" RENAME COLUMN "valor_total" TO "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "precoVenda"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "precoVenda" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valorTotal" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valorTotal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "precoVenda"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "precoVenda" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" RENAME COLUMN "valorTotal" TO "valor_total"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" RENAME COLUMN "precoVenda" TO "preco_venda"`);
    }

}
