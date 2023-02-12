import CPFService from '../cpf.service';

export default class CPFDBValidate {
    public static checkIfCPFAlreadyExist = async (cpfNumber) => {
        console.log(cpfNumber);        
        const CPFcheck =  await CPFService.findOneCPF(cpfNumber);
        console.log(CPFcheck);        
        if (CPFcheck) {
            return { type: 500, message: 'ExistsCpfException' };
        }
        return { type: null, message: 'ExistsCpfException' };
    };
}