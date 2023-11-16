import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { UUID } from 'src/utils/types/uuid';
import { User } from 'src/users/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
@Entity('user_to_task')
export class UserToTask extends EntityHelper {
    @Column()
    userId: UUID;
    @Column()
    taskId: UUID;
    @ManyToOne(() => User, (user) => user.userToTask)
    user: User;
    @ManyToOne(() => Task, (task) => task.userToTask)
    task: Task;

}