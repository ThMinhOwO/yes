import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, OneToMany } from "typeorm";
import { Message } from "./message.entity";
import { RoomToUser } from "./room-to-user.entity";

@Entity('room')
export class Room extends EntityHelper{
    @Column({nullable: true, length: 100, default: null})
    title: string;

    @Column({nullable: true, length: 500, default: null})
    description: string;

    @Column({nullable: true, length: 100, default: null})
    emoji: string;
    
    @OneToMany(() => Message, message => message.room)
    messages: Message[];

    @OneToMany(() => RoomToUser, roomToUser => roomToUser.room)
    roomToUser: RoomToUser[];
}