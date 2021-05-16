import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import get from 'lodash/get'
import React from "react";
import { Controller } from "react-hook-form";

function AutoCompleteField({ control, register, label, name, options, optionsLabel, optionsValue, required,className, ...props }) {
    const { ref, ...rest } = register(name);

    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    {...props}
                    className={className}
                    options={options}
                    getOptionLabel={(option) => option[optionsLabel]}
                    renderOption={(option) => (
                        <span>
                            {option[optionsLabel]}
                        </span>
                    )}
                    getOptionSelected={(option, value) =>
                        value === undefined || value === "" || option.id === value.id
                    }
                    value={
                        field.value
                            ? options.find(
                                (item) => item[optionsValue] === field.value
                            )
                            : ""
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...rest}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                            }}
                            variant="outlined"
                            required={required}
                        />
                    )}
                    onChange={(_, data) => field.onChange(get(data, optionsValue, null))}
                />
            )}
            name={name}
            control={control}
        />
    );
}

export { AutoCompleteField }
