import { UserRepository } from './../../app/interfaces/repositories/UserRepository';
import { User } from './../../app/interfaces/entities/User';
import UserFilter from '../../app/dtos/filters/UserFilter';
import Status from '../../app/dtos/Status';
import Type from '../../app/dtos/Type';


class UserRepositoryInMemory implements UserRepository{
    entityDB: User[];

    constructor() {
        this.entityDB = [];
    }

    async save(entity: User): Promise<User> {
        if(entity.id){
            await this.deleteById(entity.id);
        }else{
            entity.id = this.getNextId();
        }
        this.entityDB.push(entity);
        return entity;
    }

    async findById(id: number): Promise<User | null> {
        const user: User | undefined = this.entityDB.find(aux => aux.id == id);
        return user ? user : null;
    }

    async deleteById(id: number): Promise<any> {
        const index = this.entityDB.findIndex(aux => aux.id == id);
        return this.entityDB.splice(index, 1);
    }

    async find(filter: UserFilter): Promise<User[]> {
        var conditions = this.getConditions(filter);
        return this.entityDB.filter(item => {
            for (let f of conditions) {
                const key = f.key == "name"  ? "name" 
                            : f.key == "status" ? "status"
                            : "type";
                if (!f.condition(f.value, item[key])) {
                    return false;
                }
            }
            return true;
        }); 
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

    private getConditions(filter: UserFilter) {
        
        var conditions: any = [];

        if(filter.name) {
            conditions.push(
                {
                    condition: function(v1:string, v2:string) {
                        return v2.includes(v1);
                    },
                    key: "name",
                    value: filter.name
                }
            )
        }
        if(filter.status) {
            conditions.push(
                {
                    condition: function(v1:Status, v2:Status) {
                      return v1 == v2;
                    },
                    key: "status",
                    value: filter.status
                }
            )
        }
        if(filter.type) {
            conditions.push(
                {
                    condition: function(v1:Type, v2:Type) {
                      return v1 == v2;
                    },
                    key: "type",
                    value: filter.type
                }
            )
        }
        return conditions;
    }
}

export default UserRepositoryInMemory;