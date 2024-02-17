import { CustomError } from './../errors/CustomError';
import { Request } from 'express';

import moment from 'moment';

export default class UtilService {
    private static DATE_FORMAT = 'YYYY-MM-DD';

    static parseDate(dateStr?: string): Date | undefined {
        if(!dateStr) return undefined;
        const dateMoment = moment(dateStr, UtilService.DATE_FORMAT);
        if(!dateMoment.isValid()){
            throw new CustomError(`Invalid date format (${dateStr}), correct format: '${UtilService.DATE_FORMAT}'`, 404);
        }
        return dateMoment.toDate();
    }

    static parseDateToSQL(date: Date): string {
        return moment(date).format(UtilService.DATE_FORMAT)
    }

    static dateFormatStr(date: Date): string {
        return UtilService.parseDateToSQL(date);
    }
}