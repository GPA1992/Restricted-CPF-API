import visitorModel from '../models/visitor.model';

export const visitorCreate = async (visitor) => {
    const create = await visitorModel.create(visitor);
    return create;
};

export const getAll = async () => {
    const visitors = await visitorModel.findAll();
    return visitors;
};