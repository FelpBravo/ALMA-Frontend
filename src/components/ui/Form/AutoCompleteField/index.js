import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AutocompleteBase from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/styles";
import { isEmpty } from "lodash";
import get from 'lodash/get'
import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import IntlMessages from "util/IntlMessages";

const Autocomplete = withStyles ({
    option: {
        '&[aria-selected="true"]': {
            backgroundColor: 'transparent',
        },
        "&:hover": {
            color: "#3699FF",
            backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
    },
})(AutocompleteBase);

function AutoCompleteField({ control, errors, register, getUrl, label, name, options, optionsLabel, renderOption, optionsValue, required, className, ...props }) {
    const { ref, ...rest } = register(name);
    const [data, setData] = useState(options || [])
    const [loading, setLoading] = useState(false);
    const isAsync = typeof getUrl === "function";
    const errorMessage = get(errors, `${name}.message`, '');
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

    const onClose = (onChange, data) => {
        if(isEmpty(data)){
            onChange(null)
        }
    }  

    return (
        <Controller
            render={({ field = {} }) => (
                <Autocomplete
                    {...field}
                    onClose={() => onClose(field?.onChange, data)}
                    className={className}
                    options={data}
                    loading={loading}
                    getOptionLabel={(option) => get(option, optionsLabel, "")}
                    renderOption={renderOption ?? ((option) => (
                            option[optionsLabel]
                    ))}
                    getOptionSelected={(option, value) =>
                        (value === undefined || value === "" || option?.id === value?.id)
                    }
                    value={
                        field?.value
                            ? data.find(
                                (item) => item[optionsValue] === field?.value
                            )
                            : ""
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...rest}
                            helperText={errorMessage && <IntlMessages id={errorMessage} />}
                            error={Boolean(errorMessage)}
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
                    onChange={(_, data) => field?.onChange && field?.onChange(get(data, optionsValue, null))}
                    {...props}
                />
            )}
            name={name}
            control={control}
        />
    );
}

export { AutoCompleteField }
