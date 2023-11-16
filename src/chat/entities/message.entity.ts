import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, ManyToOne } from "typeorm";
import { Room } from "./room.entity";
import { UUID } from "src/utils/types/uuid";

@Entity('message')
export class Message extends EntityHelper{
    @Column({length: 255})
    message: string;

    @Column({nullable: true, default: null})
    attachment: string;

    @Column()
    roomId: UUID;

    @Column()
    userId: UUID;

    @ManyToOne(() => Room, room => room.messages)
    room: Room;

}