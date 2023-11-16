import { SetMetadata } from '@nestjs/common';
import { UUID } from 'src/utils/types/uuid';

export const Roles = (...roles: UUID[]) => SetMetadata('roles', roles);
