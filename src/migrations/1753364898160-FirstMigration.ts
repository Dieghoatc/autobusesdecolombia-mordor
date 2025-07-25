import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1753364898160 implements MigrationInterface {
    name = 'FirstMigration1753364898160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transport_categories" ("transport_category_id" SERIAL NOT NULL, "name" character varying, "description" character varying, "slug" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e3e9731f6a298f3916e9cc67ef" PRIMARY KEY ("transport_category_id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("country_id" SERIAL NOT NULL, "country_name" character varying NOT NULL, "iso_code" character varying NOT NULL, CONSTRAINT "UQ_7b43bd0eebff4e8dd4910d70ff0" UNIQUE ("country_name"), CONSTRAINT "UQ_31d60a54633e88225b40081e187" UNIQUE ("iso_code"), CONSTRAINT "PK_9886b09af4b4724d595b2e3923c" PRIMARY KEY ("country_id"))`);
        await queryRunner.query(`CREATE TABLE "company_serial" ("company_serial_id" SERIAL NOT NULL, "company_serial_code" character varying, "companiesCompanyId" integer, CONSTRAINT "PK_711ef6836850468a95cd4c9f9a4" PRIMARY KEY ("company_serial_id"))`);
        await queryRunner.query(`CREATE TABLE "company_service" ("company_service_id" SERIAL NOT NULL, "company_service_name" character varying, "companiesCompanyId" integer, CONSTRAINT "PK_ab86eba1ce4acee716725244716" PRIMARY KEY ("company_service_id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("company_id" SERIAL NOT NULL, "company_serial_id" integer, "company_service_id" integer, "country_id" integer, "company_name" character varying, "servicio" character varying, "routes" character varying, "description" character varying, "company_logo" character varying, "city" character varying, "company_url" character varying, "active" boolean DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c008cd5c4c0c20cf1e77f68e8d" PRIMARY KEY ("company_id"))`);
        await queryRunner.query(`CREATE TABLE "chassis" ("chassis_id" SERIAL NOT NULL, "brand_id" integer, "chassis_name" character varying, "description" character varying, CONSTRAINT "UQ_d65635257e4e2d0dea30d46b324" UNIQUE ("chassis_name"), CONSTRAINT "PK_7d2bb5ecc8817dae5d54e98f5bf" PRIMARY KEY ("chassis_id"))`);
        await queryRunner.query(`CREATE TABLE "bodyworks" ("bodywork_id" SERIAL NOT NULL, "brand_id" integer, "bodywork_name" character varying, "description" character varying, "vehiclesVehicleId" integer, CONSTRAINT "UQ_9ec75740f6842d79fbd90721ae8" UNIQUE ("bodywork_name"), CONSTRAINT "PK_fb9b1eef4a669ccc331bee8f1a8" PRIMARY KEY ("bodywork_id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("brand_id" SERIAL NOT NULL, "name" character varying, "logo" character varying, "url" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55d2203577d8ae7b060b205c6d" PRIMARY KEY ("brand_id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("model_id" SERIAL NOT NULL, "brand_id" integer, "model_name" character varying, "description" character varying, "year_from" integer, CONSTRAINT "UQ_28d23f5ebf773368621b7cfa91d" UNIQUE ("model_name"), CONSTRAINT "REL_f2b1673c6665816ff753e81d1a" UNIQUE ("brand_id"), CONSTRAINT "PK_f020bf2c948547e33bebe0361dd" PRIMARY KEY ("model_id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_types" ("vehicle_type_id" SERIAL NOT NULL, "name" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_521e89eb074cfce4a101397064f" UNIQUE ("name"), CONSTRAINT "PK_9895ef28111f2ec309ac72ed0ec" PRIMARY KEY ("vehicle_type_id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("vehicle_id" SERIAL NOT NULL, "vehicle_type_id" integer, "model_id" integer, "chassis_id" integer, "bodywork_id" integer, "company_id" integer, "transport_category_id" integer, "plate" character varying, "year_manufactured" integer, "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_daf0b353d75b92156fdbe18791e" PRIMARY KEY ("vehicle_id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("photographer_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_56c3501b9a9f8bac3bf04088fc1" UNIQUE ("name"), CONSTRAINT "PK_4455509ed06203c373bdc471554" PRIMARY KEY ("photographer_id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_photos" ("vehicle_photo_id" SERIAL NOT NULL, "vehicle_id" integer NOT NULL, "image_url" character varying NOT NULL, "photographer_id" integer NOT NULL, "country_id" integer NOT NULL, "location" character varying NOT NULL, "department" character varying, "description" character varying, "notes" character varying, "tags" character varying, "status" character varying, "likes" integer, "views" integer, "favorites" integer, "shares" integer, "comments" integer, "downloads" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_103125b9e06d295290c52a3442f" UNIQUE ("image_url"), CONSTRAINT "PK_5be59bf729054ccb77cc3e0136d" PRIMARY KEY ("vehicle_photo_id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("post_id" SERIAL NOT NULL, "image_url" character varying, "title" character varying, "slug" character varying, "tags" character varying, "content" json, CONSTRAINT "PK_e55cc433639d0e21c3dbf637bce" PRIMARY KEY ("post_id"))`);
        await queryRunner.query(`ALTER TABLE "company_serial" ADD CONSTRAINT "FK_068450cc1d71063edbb0b6cebd0" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_service" ADD CONSTRAINT "FK_32c8d0724b19cfc1e8043548f0f" FOREIGN KEY ("companiesCompanyId") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_c0b822f1f2592917b52bd7368ba" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chassis" ADD CONSTRAINT "FK_d5d68b66ef680cd22875325ee35" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bodyworks" ADD CONSTRAINT "FK_bbb4021244c454b07ffeeef3741" FOREIGN KEY ("vehiclesVehicleId") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_8c6922f37d6f8a496a4cabfe080" FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle_types"("vehicle_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c4fe98a2147b08df1ab56df5313" FOREIGN KEY ("model_id") REFERENCES "models"("model_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_655b89bf3ac08e8b6776f775575" FOREIGN KEY ("chassis_id") REFERENCES "chassis"("chassis_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_62860a5075e8b560dac316b466a" FOREIGN KEY ("bodywork_id") REFERENCES "bodyworks"("bodywork_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_d543658a0a04cecbd1b0f7a8fc7" FOREIGN KEY ("transport_category_id") REFERENCES "transport_categories"("transport_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_photos" ADD CONSTRAINT "FK_52588c6844bacb96079313a588b" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_photos" ADD CONSTRAINT "FK_5db4b40917e661f9ea323097cde" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_photos" ADD CONSTRAINT "FK_50a0e9c6ac4b58a4a757555adc5" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_photos" DROP CONSTRAINT "FK_50a0e9c6ac4b58a4a757555adc5"`);
        await queryRunner.query(`ALTER TABLE "vehicle_photos" DROP CONSTRAINT "FK_5db4b40917e661f9ea323097cde"`);
        await queryRunner.query(`ALTER TABLE "vehicle_photos" DROP CONSTRAINT "FK_52588c6844bacb96079313a588b"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_d543658a0a04cecbd1b0f7a8fc7"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_62860a5075e8b560dac316b466a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_655b89bf3ac08e8b6776f775575"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c4fe98a2147b08df1ab56df5313"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_8c6922f37d6f8a496a4cabfe080"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_bbb4021244c454b07ffeeef3741"`);
        await queryRunner.query(`ALTER TABLE "bodyworks" DROP CONSTRAINT "FK_0ef2e94df6e26c47b388bdd94f7"`);
        await queryRunner.query(`ALTER TABLE "chassis" DROP CONSTRAINT "FK_d5d68b66ef680cd22875325ee35"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_c0b822f1f2592917b52bd7368ba"`);
        await queryRunner.query(`ALTER TABLE "company_service" DROP CONSTRAINT "FK_32c8d0724b19cfc1e8043548f0f"`);
        await queryRunner.query(`ALTER TABLE "company_serial" DROP CONSTRAINT "FK_068450cc1d71063edbb0b6cebd0"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "vehicle_photos"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "vehicle_types"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "bodyworks"`);
        await queryRunner.query(`DROP TABLE "chassis"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_service"`);
        await queryRunner.query(`DROP TABLE "company_serial"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "transport_categories"`);
    }

}
