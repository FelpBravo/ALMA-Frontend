import { date, number, object, string } from 'yup';

const schema = object().shape({
    // title: string().min(3, "Minimo 3 caracteres").required("Titulo Campo requerido"),
    // email: string().email().required("Titulo Campo requerido"),
    // goal: number().positive(""),
    // status: string().required(),
    // dueDate: date().required().min("2021-12-01"),
    version: string().required()
});

export default schema;
