import { Record } from './../interfaces/entities/Record';
import { Category } from './../interfaces/entities/Category';
import UtilService from "../services/UtilService";

class RecordResponseDTO {
    id?: number;
    description: string;
    amount: Number;
    category?: Category;
    registryAt?: Date;
    dueDate: string;
    paid: Boolean;

    private constructor(){}

    static create(entity: Record): RecordResponseDTO {
        const dto = new RecordResponseDTO();
        dto.id = entity.id;
        dto.description = entity.description;
        dto.amount = entity.amount;
        dto.category = dto.mountCategory(entity.category);
        dto.registryAt = entity.registryAt;
        dto.dueDate = UtilService.dateFormatStr(entity.dueDate);
        dto.paid = entity.paid;
        return dto;
    }

    private mountCategory(category?: Category): Category {
        return {
            id: category?.id,
            name: category?.name
        }
    }
}

export default RecordResponseDTO