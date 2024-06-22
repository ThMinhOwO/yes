import { Module } from '@nestjs/common';
import {  MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ProjectsModule } from 'src/projects/projects.module';

import { UsersModule } from 'src/users/users.module';



@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MinioController],
  providers: [IsExist, IsNotExist, MinioService],
  exports: [MinioService],
})
export class MinioModule {}
