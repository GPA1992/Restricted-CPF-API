interface ServiceResponse {
  type: number;
  message: string | [] | object;
}

interface CPFresponse {
  cpf: string;
  createdAt: Date;
}

export { ServiceResponse, CPFresponse, CPFBody };
