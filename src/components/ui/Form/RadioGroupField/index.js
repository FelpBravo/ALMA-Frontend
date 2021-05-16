import * as React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup } from "@material-ui/core";

const RadioGroupField = ({ control, name, label, children }) => (
    <section>
        {label && <label>{label}</label>}
        <Controller
            render={({ field }) => (
                <RadioGroup {...field}>
                    {children}
                </RadioGroup>
            )}
            name={name}
            control={control}
        />
    </section>
);

export { RadioGroupField };