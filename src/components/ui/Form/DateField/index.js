import { KeyboardDatePicker } from "@material-ui/pickers";
import { get } from "lodash";
import * as React from "react";
import { Controller } from "react-hook-form";

import { FORMAT_YYYY_MM_DD } from 'constants/constUtil';

const DateField = ({ control, name, label, errors, ...props }) => {
    const errorMessage = get(errors, `${name}.message`, '');

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                    size="small"
                    id="date-picker-dialog"
                    label={label}
                    inputVariant="outlined"
                    fullWidth
                    clearable
                    format={FORMAT_YYYY_MM_DD}
                    error={Boolean(errorMessage)}
                    helperText={errorMessage}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                    {...rest}
                    {...props}
                />
            )}
        />);
}

export { DateField }