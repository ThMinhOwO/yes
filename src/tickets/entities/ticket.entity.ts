import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { Customer } from "src/customers/entities/customer.entity";
import { Task } from "src/tasks/entities/task.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { UUID } from "src/utils/types/uuid";
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Ticket extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column()
    title?: string;

    @Allow()
    @ApiProperty()
    @Column()
    description?: string;
    
    @Allow()
    @ApiProperty()
    @Column()
    attachment?: string;

    @Allow()
    @ApiProperty()
    @Column()
    status?: string;

    @ManyToOne(() => Customer, (customer) => customer.tickets)
    customer?: Customer;
}