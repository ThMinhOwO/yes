import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, ManyToOne } from "typeorm";
import { UUID } from "src/utils/types/uuid";
import { Customer } from "./customer.entity";
import { Project } from "src/projects/entities/project.entity";

@Entity('customer_to_project')
export class CustomerToProject extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column({type: 'uuid'})
    customerId?: UUID;

    @Allow()
    @ApiProperty()
    @Column({type: 'uuid'})
    projectId?: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    status?: string;

    @ManyToOne(() => Customer, (customer) => customer.customerToProjects)
    customer?: Customer;

    @ManyToOne(() => Project, (project) => project.customerToProjects)
    project?: Project;

}