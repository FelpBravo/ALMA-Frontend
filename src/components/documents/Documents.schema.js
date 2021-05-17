import { object, string, number, date } from 'yup';

const editModeSchema = object().shape({
    version: string().required(),
});
const createModeSchema = object().shape({
    documentsType: string().required(),
});

export { editModeSchema, createModeSchema };
