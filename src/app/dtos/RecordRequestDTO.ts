import { Record } from './../interfaces/entities/Record';
class RecordRequestDTO {
    id?: number;
    description: string;
    amount: number;
    categoryId: number;
    dueDate: Date;
    paid: boolean;
    userId?: number;

    constructor(json:any){
        this.id = json.id;
        this.description = json.description;
        this.amount = json.amount;
        this.categoryId = json.categoryId;
        this.dueDate = json.dueDate;
        this.paid = json.paid;
    }

    toEntity(): Record {
        return {
            id: this.id,
            description: this.description,
            amount:  this.amount,
            dueDate: this.dueDate,
            paid: this.paid,
            user: { id: this.userId },
            category: { id: this.categoryId }
        }
    }
}

export default RecordRequestDTO