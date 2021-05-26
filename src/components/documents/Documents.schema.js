import { date, number, object, string } from 'yup';

const editModeSchema = {};

const createModeSchema = {
    documentsType: string().required(),
};

export { editModeSchema, createModeSchema };
