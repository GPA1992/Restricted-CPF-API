import CPFModel from '../../database/models/cpf.model';
import CPFDBValidate from './dbvalidate/cpfDbValidate';
import { ServiceResponse } from '../../types/types';
import CPFBody from './types/cpf';


export default class CPFService {
    public static addCPF = async (cpf: CPFBody): Promise<ServiceResponse> => {
        try {    
            const CPFValidate = await CPFDBValidate.checkIfCPFAlreadyExist(cpf);
            if (CPFValidate.type) {
                return CPFValidate;
            }
            await CPFModel.create({ cpf }); 
            return { type: null, message: 'CPF CREATED' };  
        } catch (error) {
            return error.message; 
        }        
    };

    public static findOneCPF = async (cpf: CPFBody) => {
        try {
            const findCPF = await CPFModel.findOne({where: {cpf}});
            return findCPF;
        } catch (error) {
            return error.message; 
        }
       
    };

    public static findAllCPF = async () => {
        try {
            const findCPF = await CPFModel.findAll();
            return findCPF;
        } catch (error) {
            return error.message; 
        }
       
    };

    public static deleteCPF = async (cpf) => {
        try {
            const findCPF = await CPFModel.destroy({where: {cpf}});
            return findCPF;
        } catch (error) {
            return error.message; 
        }
    };
}