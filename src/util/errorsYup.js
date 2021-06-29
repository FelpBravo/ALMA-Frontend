export const locale = {
    mixed: {
        required: 'forms.errors.validation.mixed.required',
        notType: function notType(_ref) {
            switch (_ref.type) {
                case 'number':
                    return 'forms.errors.validation.mixed.type.integer';
                case 'string':
                    return 'forms.errors.validation.mixed.type.string';
                default:
                    return 'forms.errors.validation.mixed.type.default';
            }
        }
    },
    string: {
        min: ({ min }) => ({ key: 'forms.errors.validation.string.min', values: { min } }),
        max: ({ max }) => ({ key: 'forms.errors.validation.string.max', values: { max } }),
    },
    number: {
        positive: 'forms.errors.validation.integer.positive',
        max: ({ max }) => ({ key: 'forms.errors.validation.integer.max', values: { max } }),
    },
}