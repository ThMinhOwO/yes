import { MigrationInterface, QueryRunner } from "typeorm";

export class Add71700373146030 implements MigrationInterface {
    name = 'Add71700373146030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "objectId" character varying NOT NULL, "objectType" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "attachment" character varying NOT NULL, "status" character varying NOT NULL, "taskId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying(255) NOT NULL, "attachment" character varying, "roomId" uuid NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100), "description" character varying(500), "emoji" character varying(100), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_to_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roomId" uuid NOT NULL, "userId" uuid NOT NULL, "isMuted" boolean NOT NULL DEFAULT false, "isPinned" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7091839de9b08c9b7504b615bd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_to_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid NOT NULL, "userId" uuid NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_06611d7a6a1e7af3a537d2a07f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "attachment" character varying NOT NULL, "status" character varying NOT NULL, "customerId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying, "phone" character varying, "address" character varying, "city" character varying, "country" character varying, "avatar" character varying, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_to_project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid NOT NULL, "projectId" uuid NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_cafa7d846fff19417c74ec925cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f04d58ea84d2b3a4ca536adcde6" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_user" ADD CONSTRAINT "FK_804753e809931f959b0e1c14ce9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_user" ADD CONSTRAINT "FK_7634691047588221e71f48501f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_to_user" ADD CONSTRAINT "FK_125952de1bad59412e4e0b3d9e7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_to_user" ADD CONSTRAINT "FK_345b9f44df840afecde81edc0c1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_8932781487db15d1393b206482e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_to_project" ADD CONSTRAINT "FK_d6bf220bf4d67461f19df6d6a8e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_to_project" ADD CONSTRAINT "FK_fea621f9c905b97675b0cc48e95" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_to_project" DROP CONSTRAINT "FK_fea621f9c905b97675b0cc48e95"`);
        await queryRunner.query(`ALTER TABLE "customer_to_project" DROP CONSTRAINT "FK_d6bf220bf4d67461f19df6d6a8e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_8932781487db15d1393b206482e"`);
        await queryRunner.query(`ALTER TABLE "customer_to_user" DROP CONSTRAINT "FK_345b9f44df840afecde81edc0c1"`);
        await queryRunner.query(`ALTER TABLE "customer_to_user" DROP CONSTRAINT "FK_125952de1bad59412e4e0b3d9e7"`);
        await queryRunner.query(`ALTER TABLE "room_to_user" DROP CONSTRAINT "FK_7634691047588221e71f48501f3"`);
        await queryRunner.query(`ALTER TABLE "room_to_user" DROP CONSTRAINT "FK_804753e809931f959b0e1c14ce9"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f04d58ea84d2b3a4ca536adcde6"`);
        await queryRunner.query(`DROP TABLE "customer_to_project"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "customer_to_user"`);
        await queryRunner.query(`DROP TABLE "room_to_user"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "customer_to_ticket"`);
    }

}
