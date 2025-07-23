import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1753237480022 implements MigrationInterface {
    name = 'FirstMigration1753237480022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transport_categories" ("transport_category_id" SERIAL NOT NULL, "name" character varying, "description" character varying, "slug" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e3e9731f6a298f3916e9cc67ef" PRIMARY KEY ("transport_category_id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("country_id" SERIAL NOT NULL, "country_name" character varying NOT NULL, "iso_code" character varying NOT NULL, CONSTRAINT "UQ_7b43bd0eebff4e8dd4910d70ff0" UNIQUE ("country_name"), CONSTRAINT "UQ_31d60a54633e88225b40081e187" UNIQUE ("iso_code"), CONSTRAINT "PK_9886b09af4b4724d595b2e3923c" PRIMARY KEY ("country_id"))`);
        await queryRunner.query(`CREATE TABLE "company_serials" ("company_serial_id" SERIAL NOT NULL, "company_serial_code" character varying, CONSTRAINT "PK_0e806b607730c2d8111d827c0fe" PRIMARY KEY ("company_serial_id"))`);
        await queryRunner.query(`CREATE TABLE "company_services" ("company_service_id" SERIAL NOT NULL, "company_service_name" character varying, CONSTRAINT "PK_7d1e91e711bd68a22b36daf3357" PRIMARY KEY ("company_service_id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("company_id" SERIAL NOT NULL, "company_name" character varying, "company_serial_id" integer, "company_service_id" integer, "description" character varying, "company_logo" character varying, "city" character varying, "country_id" integer, "company_url" character varying, "active" boolean DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c008cd5c4c0c20cf1e77f68e8d" PRIMARY KEY ("company_id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("brand_id" SERIAL NOT NULL, "brand_name" character varying, "brand_logo" character varying, "brand_url" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55d2203577d8ae7b060b205c6d" PRIMARY KEY ("brand_id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("model_id" SERIAL NOT NULL, "brand_id" integer, "model_name" character varying, "description" character varying, "year_from" integer, CONSTRAINT "UQ_28d23f5ebf773368621b7cfa91d" UNIQUE ("model_name"), CONSTRAINT "REL_f2b1673c6665816ff753e81d1a" UNIQUE ("brand_id"), CONSTRAINT "PK_f020bf2c948547e33bebe0361dd" PRIMARY KEY ("model_id"))`);
        await queryRunner.query(`CREATE TABLE "chassis" ("chassis_id" SERIAL NOT NULL, "brand_id" integer, "chassis_name" character varying, "description" character varying, CONSTRAINT "UQ_d65635257e4e2d0dea30d46b324" UNIQUE ("chassis_name"), CONSTRAINT "PK_7d2bb5ecc8817dae5d54e98f5bf" PRIMARY KEY ("chassis_id"))`);
        await queryRunner.query(`CREATE TABLE "bodyworks" ("bodywork_id" SERIAL NOT NULL, "brand_id" integer, "bodywork_name" character varying, "description" character varying, CONSTRAINT "UQ_9ec75740f6842d79fbd90721ae8" UNIQUE ("bodywork_name"), CONSTRAINT "PK_fb9b1eef4a669ccc331bee8f1a8" PRIMARY KEY ("bodywork_id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("vehicle_id" SERIAL NOT NULL, "brand_id" integer, "model_id" integer, "chassis_id" integer, "bodywork_id" integer, "company_id" integer, "company_serial_id" integer, "company_service_id" integer, "transport_category_id" integer, "plate" character varying, "year_manufactured" integer, "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_daf0b353d75b92156fdbe18791e" PRIMARY KEY ("vehicle_id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("photographer_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_56c3501b9a9f8bac3bf04088fc1" UNIQUE ("name"), CONSTRAINT "PK_4455509ed06203c373bdc471554" PRIMARY KEY ("photographer_id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("photo_id" SERIAL NOT NULL, "vehicle_id" integer NOT NULL, "image_url" character varying NOT NULL, "photographer_id" integer NOT NULL, "location" character varying NOT NULL, "department" character varying, "country_id" integer NOT NULL, "description" character varying, "notes" character varying, "tags" character varying, "status" character varying, "likes" integer, "views" integer, "favorites" integer, "shares" integer, "comments" integer, "downloads" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d5bfcd886a99a4d2c3db9c11e45" UNIQUE ("image_url"), CONSTRAINT "PK_81414cde6651382acfbe171ef1f" PRIMARY KEY ("photo_id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("post_id" SERIAL NOT NULL, "image_url" character varying, "title" character varying, "slug" character varying, "tags" character varying, "content" json, CONSTRAINT "PK_e55cc433639d0e21c3dbf637bce" PRIMARY KEY ("post_id"))`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_c0b822f1f2592917b52bd7368ba" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_633dd8e013069e090ab81b8b2d8" FOREIGN KEY ("company_serial_id") REFERENCES "company_serials"("company_serial_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_c8c9d14085d88002c64bfb06694" FOREIGN KEY ("company_service_id") REFERENCES "company_services"("company_service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_d5d68b66ef680cd22875325ee35" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_73799befe8cf03cf49595d96d6d" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c4fe98a2147b08df1ab56df5313" FOREIGN KEY ("model_id") REFERENCES "models"("model_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_655b89bf3ac08e8b6776f775575" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_62860a5075e8b560dac316b466a" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_d543658a0a04cecbd1b0f7a8fc7" FOREIGN KEY ("transport_category_id") REFERENCES "transport_categories"("transport_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_3811669e6fb07fa931be040623e" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_3811669e6fb07fa931be040623e"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_f7b47da1a50daa1aafcb27510a9"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_d543658a0a04cecbd1b0f7a8fc7"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_62860a5075e8b560dac316b466a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_655b89bf3ac08e8b6776f775575"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c4fe98a2147b08df1ab56df5313"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_73799befe8cf03cf49595d96d6d"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_d5d68b66ef680cd22875325ee35"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_c8c9d14085d88002c64bfb06694"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_633dd8e013069e090ab81b8b2d8"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_c0b822f1f2592917b52bd7368ba"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "bodyworks"`);
        await queryRunner.query(`DROP TABLE "chassis"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_services"`);
        await queryRunner.query(`DROP TABLE "company_serials"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "transport_categories"`);
    }

}
