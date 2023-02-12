interface ServiceResponse {
  type: number;
  message: string | [] | object;
}

interface CPFresponse {
  cpf: string;
  createdAt: string;
}

export { ServiceResponse, CPFresponse };
