import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class aumentaTamanhoUrlPara2561756716079423
  implements MigrationInterface
{
  name = 'aumentaTamanhoUrlPara2561756716079423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'produto_imagens',
      'url',
      new TableColumn({
        name: 'url',
        type: 'varchar',
        length: '256',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'produto_imagens',
      'url',
      new TableColumn({
        name: 'url',
        type: 'varchar',
        length: '100',
        isNullable: false,
      }),
    );
  }
}
