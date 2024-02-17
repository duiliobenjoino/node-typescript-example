import { User } from '../../../app/interfaces/entities/User';
import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity('user')
class UserEntity implements User {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 20, nullable: false, unique: true })
    login: string;

    @Column('varchar', { length: 50, nullable: false })
    password: string;

    @Column('varchar', { length: 10, nullable: false })
    type: string;

    @Column('varchar', { length: 10, nullable: false })
    status: string;
}

export default UserEntity;