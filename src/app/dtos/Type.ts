enum Type {
    USER="USER",
    ADMIN="ADMIN"
}

namespace Type {
    export function valueOf(str?: string): Type {
        return Type[str as keyof typeof Type] as Type;
    }
}

export default Type