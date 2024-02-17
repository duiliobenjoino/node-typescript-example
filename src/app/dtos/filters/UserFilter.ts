import Type from "../Type";
import Status from "../Status";

class UserFilter {
    name?: string;
    type: Type;
    status: Status;

    constructor(params: any) {
        this.name = params.name
        this.type = Type.valueOf(params.type)
        this.status = Status.valueOf(params.status)
    }

    getTypeInString(): string {
        return Type[this.type]
    }

    getStatusInString(): string {
        return Status[this.status]
    }
}
export default UserFilter