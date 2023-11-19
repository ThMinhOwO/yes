import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { UUID } from "src/utils/types/uuid";
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { CustomerToProject } from "./customer-to-project.entity";
import { CustomerToUser } from "./customer-to-user.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
@Entity()
export class Customer extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    firstName?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    lastName?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    email?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    phone?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    address?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    city?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    country?: string;

    @Allow()
    @ApiProperty()
    @Column({nullable: true})
    avatar?: string;

    @OneToMany(() => CustomerToProject, (customerToProject) => customerToProject.customer)
    customerToProjects?: CustomerToProject[];

    @OneToMany(() => CustomerToUser,(customerToUser) => customerToUser.customer)
    customerToUsers?: CustomerToUser[]; 

    @OneToMany(() => Ticket, (ticket) => ticket.customer)
    tickets?: Ticket[];
}