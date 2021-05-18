import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import { TitleCard } from 'components/ui/helpers/TitleCard';
import { useFieldArray, useForm } from 'react-hook-form';
import { countries } from 'components/formTest/countries';
import { AutoCompleteField } from 'components/ui/Form';
import RolesData from './roles.json';

const useStyles = makeStyles((theme) => ({

}));

export default function RequestStep() {
    const classes = useStyles();
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "approves", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    const onSubmit = values => {
        console.log("values", values)
        alert(JSON.stringify(values))
    };
    const addField = e => {
        e.preventDefault()
        append({})
    }

    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }
    console.log("fields", fields)

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <TitleCard message="document.title.requestDocument" />
            </Grid>
            {
                RolesData.map(({ name }, rolId) => <Grid item md={12} container spacing={2}>
                    <>
                        <h6>{name}</h6>
                        <button onClick={addField}>Agregar</button>
                        {
                            fields.map((field, index) => (
                                <Grid item md={12} container key={field} spacing={2}>
                                    <Grid item md>
                                        <AutoCompleteField
                                            name={`approves.${rolId}.users.${index}`}
                                            label="Seleccionar nombre"
                                            options={countries}
                                            optionsLabel="label"
                                            optionsValue="label"
                                            {...commonProps} />
                                    </Grid>
                                    {/* <input
                            key={field.id} // important to include key with field's id
                            {...register(`name.${index}`)}
                            defaultValue={field.value} // make sure to include defaultValue
                        /> */}
                                </Grid>
                            ))
                        }
                    </>
                </Grid>)
            }

            <Grid container item md={12}>
                <button type="submit">Enviar</button>
            </Grid>
        </Grid>
    </form>
}