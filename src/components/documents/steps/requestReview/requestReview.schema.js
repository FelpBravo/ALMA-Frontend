import * as yup from 'yup';

yup.addMethod(yup.array, 'unique', function (message, mapper = a => a) {
    return this.test('unique', message, function (list) {
        return list.length === new Set(list.map(mapper)).size;
    });
});

const schema = yup.object().shape({
    approves: yup.array().of(
        yup.object().shape({
            role: yup.string().required(),
            users: yup.array().of(
                yup.object().shape({
                    userId: yup.string().required(),
                    maxDays: yup.number().required().positive().max(99).integer(),
                })
            ).unique('duplicate phone', a => a.userId)
        })
    )
});

export default schema;
