import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { UUID } from 'src/utils/types/uuid';

import { Team } from './team.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('team_to_user')
export class TeamToUser extends EntityHelper {
    @Column('team_id')
    teamId: UUID;
    @Column('user_id')
    userId: UUID;
    @ManyToOne(() => Team, (team) => team.teamToUser)
    @JoinColumn({ name: 'team_id' })
    team: Team;
    @ManyToOne(() => User, (user) => user.teamToUser)
    @JoinColumn({ name: 'user_id' })
    user: User;

}