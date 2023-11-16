import { Task } from 'src/tasks/entities/task.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Project extends EntityHelper {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
