import { CustomerToProject } from 'src/customers/entities/customer-to-project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { TeamToProject } from 'src/teams/entities/team-to-project.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
@Entity()
export class Project extends EntityHelper {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => TeamToProject, (teamToProject) => teamToProject.project, {cascade: true,nullable: true})
  teamToProject?: TeamToProject[];

  @OneToMany(() => CustomerToProject, (customerToProject) => customerToProject.project, {cascade: true,nullable: true})
  customerToProjects?: CustomerToProject[];

}
