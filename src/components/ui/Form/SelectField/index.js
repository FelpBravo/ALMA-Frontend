import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import get from 'lodash/get'
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

import IntlMessages from "util/IntlMessages";

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: "100%"
    }
}));

const SelectField = (props) => {
    const classes = useStyles();

    const {
        disabled,
        variant,
        margin,
        label,
        children,
        errors,
        className,
        name,
        defaultValue,
        control,
        rules,
        size,
        multiple,
        renderValue,
        MenuProps,
        required,
    } = props;

    const labelId = `${name}-label`;
    const errorMessage = get(errors, `${name}.message`, '');
    return (
        <FormControl
            variant={variant}
            margin={margin}
            error={Boolean(errorMessage)}
            disabled={disabled}
            size={size}
            required={required}
            className={`${className} ${classes.fullWidth}`}
        >
            <InputLabel id={labelId}>{label}</InputLabel>

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue || ""}
                rules={rules}
                render={({ field, fieldState, formState }) => (
                        <Select
                            name={name}
                            labelId={labelId}
                            label={label}
                            defaultValue={defaultValue || ""}
                            multiple={multiple}
                            renderValue={renderValue}
                            MenuProps={MenuProps}
                            {...field}
                        >
                            {children}
                        </Select>
                    )
                }
            />

            {errorMessage && <FormHelperText>{errorMessage && <IntlMessages id={errorMessage} />}</FormHelperText>}
        </FormControl>
    );
};

SelectField.defaultProps = {
    defaultValue: "",
    variant: "outlined",
    margin: "none",
    error: false,
    disabled: false,
    rules: {},
    size: "small",
    changeEvent: (e) => { },
    multiple: false,
    renderValue: null,
    MenuProps: {}
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.any,
    rules: PropTypes.any,
    defaultValue: PropTypes.any,
    margin: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.any,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    changeEvent: PropTypes.func,
    multiple: PropTypes.bool,
    renderValue: PropTypes.func,
    MenuProps: PropTypes.any,
};

export { SelectField };
