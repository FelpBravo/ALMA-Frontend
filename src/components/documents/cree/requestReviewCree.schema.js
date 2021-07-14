import * as yup from 'yup';

const schema = yup.object().shape({
    approves: yup.array().of(
        yup.object().shape({
            role: yup.string(),
            users: yup.array().of(
                yup.object().shape({
                    userId: yup.string().required(),
                    maxDays: yup.number().required().positive().max(99).integer(),
                })
            )
        })
    )
});

export default schema;