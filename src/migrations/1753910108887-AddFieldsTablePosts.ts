import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsTablePosts1753910108887 implements MigrationInterface {
    name = 'AddFieldsTablePosts1753910108887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "resume" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "resume"`);
    }

}
