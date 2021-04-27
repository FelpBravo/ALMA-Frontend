import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import get from 'lodash/get'
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
        rules
    } = props;

    const labelId = `${name}-label`;
    const errorMessage = get(errors, `${name}.message`, '');

    return (
        <FormControl
            variant={variant}
            margin={margin}
            error={Boolean(errorMessage)}
            disabled={disabled}
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
                        {...field}
                    >
                        {children}
                    </Select>
                )}
            />

            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

SelectField.defaultProps = {
    defaultValue: "",
    variant: "outlined",
    margin: "normal",
    error: false,
    disabled: false,
    rules: {},
    changeEvent: (e) => { }
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
    changeEvent: PropTypes.func
};

export { SelectField };
