import { Module } from '@nestjs/common';
import {  PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Page } from './entities/page.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ProjectsModule } from 'src/projects/projects.module';

import { UsersModule } from 'src/users/users.module';
import { PageToRole } from './entities/page-to-role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Page, PageToRole])],
  controllers: [PagesController],
  providers: [IsExist, IsNotExist, PagesService],
  exports: [PagesService],
})
export class PagesModule {}
