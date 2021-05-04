import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, TextField as InputField } from '@material-ui/core';
import { get, isEmpty } from 'lodash-es';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
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
    ...props
}) => {
    const classes = useStyles();
    const errorMessage = get(errors, `${name}.message`, '');
    const textFieldProps = {
        helperText: errorMessage,
        error: Boolean(errorMessage),
        id: id || name,
        ...register(name),
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

export { TextField }
