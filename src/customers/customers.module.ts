import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CustomerToProject } from './entities/customer-to-project.entity';
import { CustomerToUser } from './entities/customer-to-user.entity';
//import { CustomerToTicket } from './entities/customer-to-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerToProject,CustomerToUser])],
  controllers: [CustomersController],
  providers: [IsExist, IsNotExist, CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
