import { Category } from '../../../app/interfaces/entities/Category';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import UserEntity from './UserEntity';

@Entity('category')
@Unique(['user', 'name'])
export class CategoryEntity implements Category{
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user?: UserEntity
}