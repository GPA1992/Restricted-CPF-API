interface ServiceResponse {
    type: number;
    message: string | [] | object;
}

interface CPFresponse {
    cpf: string;
    createdAt: Date | string;
}

interface UserType {
    id?: number;
    name: string;
    role: string;
    password: string;
}

export { ServiceResponse, CPFresponse, UserType };
