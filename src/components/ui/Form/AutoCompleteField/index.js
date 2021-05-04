import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import get from 'lodash/get'
function AutoCompleteField({ control, label, name, options, optionsLabel, optionsValue, className, ...props }) {
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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant="outlined"
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
