import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumnTest1752743334566 implements MigrationInterface {
    name = 'DeleteColumnTest1752743334566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP COLUMN "estoesunaprueba"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ADD "estoesunaprueba" integer NOT NULL`);
    }

}
