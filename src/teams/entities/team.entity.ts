import { Project } from 'src/projects/entities/project.entity';
import { UserToTask } from 'src/tasks/entities/user-to-task.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TeamToProject } from './team-to-project';
import { TeamToUser } from './team-to-user';

@Entity('team')
export class Team extends EntityHelper {
  @Column()
  name?: string;

  @Column({ nullable: true})
  description?: string;

  @Column({ nullable: true})
  status?: string;

  @OneToMany(() => TeamToProject, (teamToProject) => teamToProject.team)
  teamToProject: TeamToProject[];

  @OneToMany(() => TeamToUser, (teamToUser) => teamToUser.team, {cascade: true,nullable: true})
  teamToUser: TeamToUser[];
}
