import { TextField as InputField, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { get, isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import React from 'react'
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    label: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
}));

const TextField = ({
    className,
    id,
    label,
    name,
    placeholder,
    register,
    shrink,
    size,
    type,
    variant,
    rows,
    multiline,
    InputProps,
    errors,
    disabled,
    required,
    ...props
}) => {
    const classes = useStyles();
    const errorMessage = get(errors, `${name}.message`, '');
    const { ref, ...rest } = register(name, {
        setValueAs: v => type === "number" ? parseInt(v) : v
    });

    const textFieldProps = {
        helperText: errorMessage && <IntlMessages id={errorMessage?.key ?? errorMessage} values={get(errorMessage, 'values', {})} />,
        error: Boolean(errorMessage),
        id: id || name,
        inputRef: ref,
        ...rest,
        label: shrink ? label : null,
        name,
        placeholder,
        size,
        type,
        variant: variant || 'outlined',
        rows,
        multiline,
        InputProps,
        disabled,
        required,
    };

    const labelProps = {
        htmlFor: id,
        classes: classes.label,
    };

    return (
        <div className={clsx(classes.root, className)}>
            {!shrink && <InputLabel {...labelProps}>{label}</InputLabel>}
            <InputField {...textFieldProps} {...props} />
        </div>
    );
};

TextField.defaultProps = {
    className: null,
    errors: null,
    id: null,
    placeholder: '',
    shrink: true,
    size: 'small',
    type: 'text',
    variant: 'outlined',
    rows: 1,
    multiline: false,
    InputProps: {},
    disabled: false,
    register: () => ({}),
    required: false,
};

TextField.propTypes = {
    className: PropTypes.string,
    errors: PropTypes.oneOfType([PropTypes.object]),
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    shrink: PropTypes.bool,
    size: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    rows: PropTypes.number,
    multiline: PropTypes.bool,
    InputProps: PropTypes.objectOf(PropTypes.object),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
};

export { TextField }
