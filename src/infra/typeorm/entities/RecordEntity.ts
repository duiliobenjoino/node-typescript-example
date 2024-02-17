import { CategoryEntity } from './CategoryEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Record } from '../../../app/interfaces/entities/Record';
import RecordRequestDTO from '../../../app/dtos/RecordRequestDTO';
import UserEntity from './UserEntity';

@Entity('record')
class RecordEntity implements Record{
    
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column('varchar', { length: 200, nullable: false })
    description: string;

    @Column({ type: 'decimal', nullable: false })
    amount: number;

    @ManyToOne(type => CategoryEntity)
    @JoinColumn({ name: "category_id"})
    category: CategoryEntity

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @Column({ name: 'registry_at', type: 'timestamp', nullable: false, default:'now()' })
    registryAt: Date

    @Column({ name: 'due_date', type: 'date', nullable: false })
    dueDate: Date

    @Column({ type: 'boolean', nullable: false })
    paid: boolean

    constructor(dto: RecordRequestDTO) {
        this.id = dto?.id;
        this.description = dto?.description;
        this.amount = dto?.amount;
        this.dueDate = dto?.dueDate;
        this.paid = dto?.paid;

        const user = new UserEntity();
        user.id = dto?.userId;
        this.user = user;

        const category = new CategoryEntity();
        category.id = dto?.categoryId;
        this.category = category;

    }
}

export default RecordEntity;