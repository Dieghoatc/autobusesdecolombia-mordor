import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true, length: 255 })
    email: string;

    // bcrypt hash; excluded from queries unless explicitly selected
    @Column({ length: 255, select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, enumName: 'users_role_enum', default: Role.Editor })
    role: Role;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
