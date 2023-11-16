import { Module } from '@nestjs/common';
import {  TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Team } from './entities/team.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TeamToProject } from './entities/team-to-project.entity';
import { TeamToUser } from './entities/team-to-user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamToUser, TeamToProject])],
  controllers: [TeamsController],
  providers: [IsExist, IsNotExist, TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
