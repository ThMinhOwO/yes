import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { UUID } from 'src/utils/types/uuid';

import { Page } from './page.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('page_to_role')
export class PageToRole extends EntityHelper {
    @Column()
    pageId: UUID;
    @Column()
    roleId: UUID;
    @ManyToOne(() => Page, (page) => page.pageToRole)
    page: Role;
    @ManyToOne(() => Role, (role) => role.pageToRole)
    role: Role;

}