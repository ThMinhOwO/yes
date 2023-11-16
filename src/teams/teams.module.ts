import { Module } from '@nestjs/common';
import {  TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Team } from './entities/team.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TeamToProject } from './entities/team-to-project';
import { ProjectsModule } from 'src/projects/projects.module';
import { TeamToUser } from './entities/team-to-user';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamToUser, TeamToProject]), ProjectsModule,UsersModule],
  controllers: [TeamsController],
  providers: [IsExist, IsNotExist, TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
