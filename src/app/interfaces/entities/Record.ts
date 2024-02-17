import { User } from './User';
import { Category } from './Category';
export interface Record {
    id?: number;
    description: string;
    amount: number;
    category?: Category;
    user?: User;
    registryAt?: Date;
    dueDate: Date;
    paid: boolean;
}