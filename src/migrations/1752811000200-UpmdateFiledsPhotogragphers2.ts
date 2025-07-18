import { MigrationInterface, QueryRunner } from "typeorm";

export class UpmdateFiledsPhotogragphers21752811000200 implements MigrationInterface {
    name = 'UpmdateFiledsPhotogragphers21752811000200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "email" SET NOT NULL`);
    }

}
