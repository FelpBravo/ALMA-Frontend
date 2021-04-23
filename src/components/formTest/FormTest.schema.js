import { object, string } from 'yup';

const schema = object().shape({
    title: string().required("Campo requerido"),
});

export default schema;
