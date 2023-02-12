import { DataTypes, Model } from 'sequelize';
import db from './index';

class CPF extends Model {
    public id!: number;
    public cpf!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

CPF.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    createdAt: true,
    updatedAt: true,
    modelName: 'cpf',
    tableName: 'cpf',
});

export default CPF;