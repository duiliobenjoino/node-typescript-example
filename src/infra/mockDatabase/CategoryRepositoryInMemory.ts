import { CategoryRepository } from './../../app/interfaces/repositories/CategoryRepository';
import { Category } from '../../app/interfaces/entities/Category';

class CategoryRepositoryInMemory implements CategoryRepository {

    entityDB: Category[];

    constructor() {
        this.entityDB = [];
    }

    async save(entity:Category, userId: number): Promise<Category> {
        entity.userId = userId;
        if(entity.id){
            const existingEntity = await this.findBy(userId, entity.id);
            if(existingEntity) {
                await this.delete(existingEntity);
            }
        }else{
            entity.id = this.getNextId();
        }
        this.entityDB.push(entity);
        return entity;
    }

    async findBy(userId: number, id: number): Promise<Category | null> {
        const entity: Category | undefined = this.entityDB.find(aux => aux.id == id && aux.userId == userId);
        return entity ? entity : null;
    }

    async delete(entity: Category): Promise<any> {
        const index = this.entityDB.findIndex(aux => aux.id == entity.id);
        return this.entityDB.splice(index, 1);
    }

    async find(userId: number, name?: string | undefined): Promise<Category[]> {
        var conditions = this.getConditions(userId, name);
        const result = this.entityDB.filter(item => {
            for (let f of conditions) {
                const key = f.key == "name"  ? "name" : "userId"; 
                if (!f.condition(f.value, item[key])) {
                    return false;
                }
            }
            return true;
        }); 
        return result;
    }

    private getNextId(){
        if(this.entityDB.length == 0) return 1;

        const lastId = this.entityDB
                .map(el => el.id)
                .reduce((el1, el2) => {
                    if(el1 && el2) return el1 > el2 ? el1 : el2;
                    return el1;
                }
        );
        return lastId as number + 1;
    }

    private getConditions(userId: number, name?: string) {
        
        var conditions: any = [];

        if(name) {
            conditions.push(
                {
                    condition: function(v1:string, v2:string) {
                        return v2.includes(v1);
                    },
                    key: 'name',
                    value: name
                }
            )
        }
        if(userId) {
            conditions.push(
                {
                    condition: function(v1:number, v2:number) {
                      return v1 == v2;
                    },
                    key: "userId",
                    value: userId
                }
            )
        }
        return conditions;
    }

}

export default CategoryRepositoryInMemory;