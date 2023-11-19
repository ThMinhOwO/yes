import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, ManyToOne } from "typeorm";
import { UUID } from "src/utils/types/uuid";
import { Customer } from "./customer.entity";
import { User } from "src/users/entities/user.entity";

@Entity('customer_to_user')
export class CustomerToUser extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column({type: 'uuid'})
    customerId!: UUID;

    @Allow()
    @ApiProperty()
    @Column({type: 'uuid'})
    userId!: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    status?: string;

    @ManyToOne(() => Customer, (customer) => customer.customerToUsers)
    customer?: Customer;

    @ManyToOne(() => User, (user) => user.customerToUsers)
    user?: User;

}