import { date, number, object, string } from 'yup';

const editModeSchema = object().shape({
});

const createModeSchema = object().shape({
    documentsType: string().required(),
});

export { editModeSchema, createModeSchema };
