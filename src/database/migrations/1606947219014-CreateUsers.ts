import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1606947219014 implements MigrationInterface {
  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'bit',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  };

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('users');
  };
}
