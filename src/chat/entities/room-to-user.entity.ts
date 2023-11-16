import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, ManyToOne } from "typeorm";
import { Room } from "./room.entity";
import { User } from "src/users/entities/user.entity";

@Entity('room_to_user')
export class RoomToUser extends EntityHelper {
    @Column()
    roomId: string;
    @Column()
    userId: string;
    @Column({ default: false })
    isMuted: boolean;
    @Column({ default: false })
    isPinned: boolean;
    @ManyToOne(() => Room, room => room.roomToUser)
    room: Room;
    @ManyToOne(() => User, user => user.roomToUser)
    user: User;
}