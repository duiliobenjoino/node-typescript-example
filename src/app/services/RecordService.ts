import { Record } from './../interfaces/entities/Record';
import { RecordRepository } from './../interfaces/repositories/RecordRepository';
import { CustomError } from '../errors/CustomError';
import { RecordFilter } from '../dtos/filters/RecordFilter';
import RecordRequestDTO from '../dtos/RecordRequestDTO';
import RecordResponseDTO from '../dtos/RecordResponseDTO';

class RecordService {
    repository: RecordRepository;

    constructor(repository: RecordRepository){
        this.repository = repository;
    }

    async find(filter: RecordFilter) {
        const entities = await this.repository.find(filter);
        return entities.map(entity => RecordResponseDTO.create(entity));
    }

    async findBy(userId:string, id: string) {
        const entity = await this.findByUserIdandId(userId, id);
        return RecordResponseDTO.create(entity);
    }

    async save(userId: string, dto: RecordRequestDTO): Promise<RecordResponseDTO> {
        dto.userId = parseInt(userId);
        const entity = await this.repository.save(dto.toEntity());
        return RecordResponseDTO.create(entity)
    }

    async deleteBy(userId:string, id: string) {
        const entity = await this.findByUserIdandId(userId, id);
        await this.repository.delete(entity);
    }

    private async findByUserIdandId(userId:string, id: string) {
        const entity = await this.repository.findById(parseInt(userId),parseInt(id));

        if(!entity){
            throw new CustomError(`Record ${id} not found`, 404);
        }

        return entity;
    }
}

export default RecordService