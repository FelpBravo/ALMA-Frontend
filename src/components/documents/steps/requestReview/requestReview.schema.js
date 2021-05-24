import { object, string, number, date, array } from 'yup';

const schema = object().shape({
    approves: array().of(
        object().shape({
            role: string().required(),
            users: array().of(
                object().shape({
                    userId: string().required(),
                    maxDays: number().required().positive().integer(),
                })
            )
        })
    )
});

export default schema;
