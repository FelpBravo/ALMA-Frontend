import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { TitleCard } from 'components/ui/helpers/TitleCard';

import RolesData from './roles.json';
import RolItem from './RolItem';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
    }
}));

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
                        <RolItem
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