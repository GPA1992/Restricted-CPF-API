import CPFModel from '../../database/models/cpf.model';
import { ServiceResponse } from '../../types/types';
import { CPFresponse }from '../../types/types';

export default class CPFService {
    public static addCPF = async (cpf: string): Promise<void> => {
        try {
            await CPFModel.create({ cpf });
        } catch (error) {
            console.log('service');
            return error.message;
        }
    };

    public static findOneCPF = async (cpfNumber: string): Promise<CPFresponse> => {
        try {
            const findCPF = await CPFModel.findOne({
                attributes: ['cpf', 'createdAt'],
                where: { cpf: cpfNumber }
            });
            return findCPF;

        } catch (error) {
            console.log('service');
            return error.message;
        }
    };

    public static findAllCPF = async (): Promise<CPFresponse[]> => {
        try {
            const findAllCPF = await CPFModel.findAll({attributes: ['cpf', 'createdAt']});
            return findAllCPF;
        } catch (error) {
            return error.message;
        }
    };

    public static deleteCPF = async (cpf: string) => {
        try {
            const deleteCPF = await CPFModel.destroy({ where: { cpf } });
            return deleteCPF;
        } catch (error) {
            return error.message;
        }
    };
}
