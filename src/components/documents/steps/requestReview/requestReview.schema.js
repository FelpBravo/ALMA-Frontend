import { array, number, object, string } from 'yup';

const schema = object().shape({
    approves: array().of(
        object().shape({
            role: string().required(),
            users: array().of(
                object().shape({
                    userId: string().required(),
                    maxDays: number().required().positive().max(99).integer(),
                })
            )
        })
    )
});

export default schema;
