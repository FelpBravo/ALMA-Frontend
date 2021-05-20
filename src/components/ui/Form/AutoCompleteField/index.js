import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AutocompleteBase from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/styles";
import get from 'lodash/get'
import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

const Autocomplete = withStyles ({
    paper: {
        backgroundColor: 'white',
    },
})(AutocompleteBase);

function AutoCompleteField({ control, register, getUrl, label, name, options, optionsLabel, renderOption, optionsValue, required, className, ...props }) {
    const { ref, ...rest } = register(name);
    const [data, setData] = useState(options || [])
    const [loading, setLoading] = useState(false);
    const isAsync = typeof getUrl === "function";

    const value = useWatch({
        control,
        name,
        defaultValue: ''
    });

    useEffect(() => {
        let active = true;

        if (value?.length > 3 && isAsync && setLoading) {
            (async () => {
                setLoading(true)
                getUrl(value).then(({ data }) => active && setData(data)).finally(() => setLoading(false))
            })();
        }

        return () => {
            active = false;
        };
    }, [value, setLoading, isAsync]);

    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    autoHighlight
                    className={className}
                    options={data}
                    loading={loading}
                    getOptionLabel={(option) => get(option, optionsLabel, "")}
                    renderOption={renderOption ?? ((option) => (
                            option[optionsLabel]
                    ))}
                    getOptionSelected={(option, value) =>
                        value === undefined || value === "" || option.id === value.id
                    }
                    value={
                        field.value
                            ? data.find(
                                (item) => item[optionsValue] === field.value
                            )
                            : ""
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...rest}
                            label={label}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                            variant="outlined"
                            required={required}
                        />
                    )}
                    onChange={(_, data) => field.onChange(get(data, optionsValue, null))}
                    {...props}
                />
            )}
            name={name}
            control={control}
        />
    );
}

export { AutoCompleteField }
