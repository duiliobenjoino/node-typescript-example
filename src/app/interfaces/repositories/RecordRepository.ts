import { Record } from '../entities/Record';
import { RecordFilter } from '../../dtos/filters/RecordFilter';
export interface RecordRepository {
    save(dto: Record): Promise<Record>
    findById(userId: number, id: number): Promise<Record | null>
    delete(entity: Record): Promise<any>
    find(filter: RecordFilter): Promise<Record[]>
}