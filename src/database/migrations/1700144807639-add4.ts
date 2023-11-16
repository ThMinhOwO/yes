import { MigrationInterface, QueryRunner } from "typeorm";

export class Add41700144807639 implements MigrationInterface {
    name = 'Add41700144807639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying(255) NOT NULL, "attachment" character varying, "roomId" uuid NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100), "description" character varying(500), "emoji" character varying(100), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room-to-user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roomId" uuid NOT NULL, "userId" uuid NOT NULL, "isMuted" boolean NOT NULL DEFAULT false, "isPinned" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_94dc3a950e2eb2ddd1efe50f285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-to-user" ADD CONSTRAINT "FK_2f519bc66fcdaecba61b3fed2e5" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-to-user" ADD CONSTRAINT "FK_8367472ee0757cea58bf0dbe1d3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-to-user" DROP CONSTRAINT "FK_8367472ee0757cea58bf0dbe1d3"`);
        await queryRunner.query(`ALTER TABLE "room-to-user" DROP CONSTRAINT "FK_2f519bc66fcdaecba61b3fed2e5"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"`);
        await queryRunner.query(`DROP TABLE "room-to-user"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
