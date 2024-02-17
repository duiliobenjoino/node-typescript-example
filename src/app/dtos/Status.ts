enum Status {
    ACTIVE="ACTIVE",
    PENDING="PENDING",
    INACTIVE="INACTIVE"
}

namespace Status {
    export function valueOf(str?: string): Status {
        return Status[str as keyof typeof Status] as Status;
    }
}

export default Status