import * as React from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, FormLabel, RadioGroup } from "@material-ui/core";
import { get } from "lodash";
import IntlMessages from "util/IntlMessages";

const RadioGroupField = ({ control, name, label, children, errors }) => {
    const errorMessage = get(errors, `${name}.message`, '');
    
    return (
        <FormControl component="fieldset" error={Boolean(errorMessage)}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <Controller
                render={({ field }) => (
                    <>
                        <RadioGroup {...field}>
                            {children}
                        </RadioGroup>
                    </>
                )}
                name={name}
                control={control}
            />
            <FormHelperText>{errorMessage && <IntlMessages id={errorMessage} />}</FormHelperText>
        </FormControl>
    );
}

export { RadioGroupField };