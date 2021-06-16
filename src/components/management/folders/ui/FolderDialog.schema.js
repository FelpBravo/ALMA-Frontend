import { object, string } from 'yup';

const schema = object().shape({
    type: object().required()
});

export default schema;
