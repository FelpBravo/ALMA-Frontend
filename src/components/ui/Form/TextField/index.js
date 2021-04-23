import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, TextField as InputField  } from '@material-ui/core';
import { isEmpty } from 'lodash-es';

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

const TextFieldComponent = ({
    className,
    error,
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
    disabled,
} ) => {
    const classes = useStyles();
    const errorMessage = error && error.message;
    const textFieldProps = {
        helperText: errorMessage,
        id: id || name,
        ...register(name),
        label: shrink ? label : null,
        name,
        placeholder,
        size,
        type,
        variant,
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
            <InputField {...textFieldProps} />
        </div>
    );
};


const TextField = React.memo(TextFieldComponent);

export { TextField };
