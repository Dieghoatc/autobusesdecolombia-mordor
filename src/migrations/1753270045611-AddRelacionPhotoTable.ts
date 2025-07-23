import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelacionPhotoTable1753270045611 implements MigrationInterface {
    name = 'AddRelacionPhotoTable1753270045611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ADD "transport_category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_5244434a9162d15cc5679dca59b" FOREIGN KEY ("transport_category_id") REFERENCES "transport_categories"("transport_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_5244434a9162d15cc5679dca59b"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP COLUMN "transport_category_id"`);
    }

}
