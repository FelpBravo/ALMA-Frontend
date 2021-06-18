import { get } from 'lodash';
import { object, string } from 'yup';

import { getValidateFolders } from 'services/foldersService';

const schema = object().shape({
    type: object().required(),
    name: string().required().min(3).test('noMatch', 'forms.errors.validation.string.noMatch', async (value, context) => {
        const originalName = get(context, 'parent.originalName', '')
        switch (true) {
            case originalName === value?.trim():
                return true;

            case value?.length > 3:
                const resp = await getValidateFolders(value)
                return !resp.data.exists

            default:
               return true;
        }
    })
});

export default schema;
