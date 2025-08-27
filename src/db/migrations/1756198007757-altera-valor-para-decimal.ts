import { MigrationInterface, QueryRunner } from 'typeorm';

export class alteraValorParaDecimal1756198007757 implements MigrationInterface {
  name = 'alteraValorParaDecimal1756198007757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "produtos"
      ALTER COLUMN "valor" TYPE numeric(10,2)
      USING "valor"::numeric(10,2)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "produtos"
      ALTER COLUMN "valor" TYPE integer
      USING ROUND("valor")::integer
    `);
  }
}
