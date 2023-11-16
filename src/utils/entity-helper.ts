import { instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UUID } from './types/uuid';

export class EntityHelper extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID;
  
  __entity?: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
