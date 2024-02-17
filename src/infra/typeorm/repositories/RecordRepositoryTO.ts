import { Record } from './../../../app/interfaces/entities/Record';
import { RecordRepository } from './../../../app/interfaces/repositories/RecordRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RecordFilter } from '../../../app/dtos/filters/RecordFilter';
import { AppDataSource } from '../datasource';
import UtilService from '../../../app/services/UtilService';
import RecordRequestDTO from '../../../app/dtos/RecordRequestDTO';
import RecordEntity from '../entities/RecordEntity';


class RecordRepositoryTO implements RecordRepository{
    repository: Repository<RecordEntity>;

    constructor(){
        this.repository = AppDataSource.getRepository(RecordEntity);
    }

    save(entity: Record): Promise<Record> {
        return this.repository.save(entity);
    }

    findById(userId: number, id: number): Promise<Record | null> {
        return this.repository.findOne({
            relations: {category: true},
            where: { id, user: {id: userId}}
        })
    }

    delete(entity: Record): Promise<any> {
        return this.repository.delete(entity);
    }

    find(filter: RecordFilter): Promise<Record[]> {
        return this
            .findSQL(filter)
            .then(result => {
                return result.map(sql => this.sqlToRecordMapper(sql));
            })
    }

    private findSQL(filter: RecordFilter): Promise<Record[]> {
        var queryBuilder = this.repository
            .createQueryBuilder("record")
            .innerJoin("record.category", "category");

        queryBuilder.where("record.user_id = :userId", {userId: filter.userId});
        this.applyFilter(filter, queryBuilder);

        return queryBuilder.select("record.*, category.name as category_name").getRawMany();
    }

    private applyFilter(filter: RecordFilter, queryBuilder: SelectQueryBuilder<Record>):void  {
        if(filter.description) {
            queryBuilder.andWhere("LOWER(description) like LOWER(:description)", {description: `%${filter.description}%`})
        }
        if(filter.categoryId) {
            queryBuilder.andWhere("category_id = :categoryId", {categoryId: filter.categoryId})
        }
        if(filter.paid != undefined) {
            queryBuilder.andWhere("paid = :paid", {paid: filter.paid})
        }
        if(filter.dueDateFrom) {
            queryBuilder.andWhere("due_date >= :dueDateFrom", {dueDateFrom: UtilService.parseDateToSQL(filter.dueDateFrom)})
        }
        if(filter.dueDateBy) {
            queryBuilder.andWhere("due_date <= :dueDateBy", {dueDateBy: UtilService.parseDateToSQL(filter.dueDateBy)})
        }
    }

    private sqlToRecordMapper(line: any): Record {
        return {
            id: line.id,
            description: line.description,
            amount: line.amount,
            category: {
                id: line.category_id,
                name: line.category_name
            },
            registryAt: line.registry_at,
            dueDate: line.due_date,
            paid: line.paid
        }
    }
}

export default RecordRepositoryTO;