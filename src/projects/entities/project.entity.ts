import { Task } from 'src/tasks/entities/task.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamToProject } from 'src/teams/entities/team-to-project';
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
}
