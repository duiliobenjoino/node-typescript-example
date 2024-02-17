import UtilService from "../../services/UtilService";

export class RecordFilter {
    userId: number;
    categoryId?: number;
    description?: string;
    dueDateFrom?: Date;
    dueDateBy?: Date;
    paid?: boolean;

    constructor(userId: string, body:any){
        this.userId = parseInt(userId);
        this.categoryId = parseInt(body.categoryId);
        this.description = body.description;
        this.paid = this.parseBoolean(body.paid);
        this.dueDateFrom = UtilService.parseDate(body.dueDateFrom);
        this.dueDateBy = UtilService.parseDate(body.dueDateBy);
    }

    private parseBoolean(field?: string) {
        if(field == undefined) return undefined;
        return field == "true";
    }
}