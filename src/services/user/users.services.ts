import { UserType } from '../../types/types';
import userModel from '../../database/models/user.model';

export default class UserServices {
    public static findByName = async (name: string): Promise<UserType> => {
        const findOne: UserType | null = await userModel.findOne({
            where: { name },
        });
        return findOne;
    };

    public static addNewUser = async ({ name, password, role }: UserType): Promise<UserType | null> => {
        const newUser: UserType | null = await userModel.create({
            name,
            password,
            role,
        });
        return newUser;
    };
}
