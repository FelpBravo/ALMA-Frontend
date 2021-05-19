import { Divider, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';

import { TitleCard } from 'components/ui/helpers/TitleCard';
import { useFieldArray, useForm } from 'react-hook-form';
import { countries } from 'components/formTest/countries';
import { AutoCompleteField } from 'components/ui/Form';
import RolesData from './roles.json';
import Button from 'components/ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
    }
}));

const NestedArray = ({ name, control, commonProps, rolName, index, setValue, mandatory }) => {
    const { fields, append, remove } = useFieldArray({ name, control });
    const classes = useStyles();

    useEffect(() => {
        setValue(`approves[${index}].role`, rolName);
    }, [])

    const addField = e => {
        e.preventDefault()
        append({})
    }

    return (<Grid item md={12} spacing={3} container alignItems="center">
        <Grid item md={12} spacing={2} container alignItems="center">
            <h5 className={classes.rolTitle}>{rolName}</h5>
            <p className={classes.rolSubTitle}>{mandatory ? "(Requerido)" : "(Opcional)"}</p>
            <Button
                variant="contained"
                color="secondary"
                onClick={addField}>
                Agregar
            </Button>
        </Grid>
        <Grid item md={12} container alignItems="center">
            {
                fields.map((field, index) => (
                    <Grid item md={12} container spacing={4} key={field}>
                        <Grid item md>
                            <AutoCompleteField
                                name={`${name}[${index}].name`}
                                label="Seleccionar nombre"
                                options={countries}
                                optionsLabel="label"
                                optionsValue="label"
                                {...commonProps} />
                        </Grid>
                        <Grid item md>
                            <AutoCompleteField
                                name={`${name}[${index}].lastname`}
                                label="Seleccionar nombre"
                                options={countries}
                                optionsLabel="label"
                                optionsValue="label"
                                {...commonProps} />
                        </Grid>
                        <Grid item md>
                            <AutoCompleteField
                                name={`${name}[${index}].age`}
                                label="Seleccionar nombre"
                                options={countries}
                                optionsLabel="label"
                                optionsValue="label"
                                {...commonProps} />
                        </Grid>
                        <Grid item md={1}>

                            <IconButton onClick={() => remove(index)} aria-label="delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Grid>

                    </Grid>
                ))
            }
        </Grid>
        <Grid item md={12} alignItems="center">
            <Divider />
        </Grid>
    </Grid>)
}

export default function RequestStep() {
    const classes = useStyles();
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {}
    });

    const { fields } = useFieldArray({
        control,
        name: "approves",
    });

    const onSubmit = values => {
        console.log("values", values)
        alert(JSON.stringify(values))
    };


    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <TitleCard message="document.title.requestDocument" />
            </Grid>

            {
                RolesData.map(({ name, ...rest }, index) =>
                    <Grid container item md={12} spacing={2}>
                        <NestedArray
                            index={index}
                            rolName={name}
                            setValue={setValue}
                            name={`approves[${index}].users`}
                            commonProps={commonProps}
                            control={control}
                            {...rest} />
                    </Grid>)
            }

            <Grid container item md={12}>
                <button type="submit">Enviar</button>
            </Grid>
        </Grid>
    </form>
}