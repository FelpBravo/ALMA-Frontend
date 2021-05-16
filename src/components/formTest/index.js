import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, makeStyles, MenuItem, Paper } from '@material-ui/core';
import React from 'react'
import { useForm } from 'react-hook-form';

import { AutoCompleteField, CheckField, SelectField, TextField } from 'components/ui/Form';

import { countries } from './countries';
import schema from './FormTest.schema';

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(2),
        marginTop: 0,
    },
}));

const CampaignForm = () => {
    const classes = useStyles();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onTouched',
        name: 'nameTest',
        defaultValues: {
            title: "SHDDH",
            country: "AE",
        },
        // resolver: yupResolver(schema),
    });

    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
        className: classes.input
    }

    const titleProps = {
        label: 'Título de campaña',
        name: 'title',
        ...commonProps
    };

    const emailProps = {
        label: 'Correo electronico',
        name: 'email',
        ...commonProps
    };

    const goalProps = {
        type: 'number',
        label: 'Cantidad ($)',
        name: 'goal',
        ...commonProps
    };

    const statusProps = {
        label: 'Estado',
        name: 'status',
        ...commonProps
    };

    const isAnonymousProps = {
        name: 'is_anonymous',
        label: '¿Es anonimo?',
        ...commonProps,
    };

    const dueDateProps = {
        type: 'date',
        label: 'Fecha vencimiento',
        name: 'dueDate',
        InputLabelProps: {
            shrink: true,
        },
        ...commonProps,
    }

    const countryProps = {
        name: 'country',
        label: 'Ciudad',
        options: countries,
        optionsLabel: "label",
        optionsValue: "code",
        ...commonProps,
    };


    const onSubmit = values => {
        console.log("values", values)
        alert(JSON.stringify(values))
    };

    const jsonButton = {
        variant: "outlined",
        color: "primary",
        type: "submit"
    }
    console.log("errors", errors)
    return (<Grid container alignItems="center" justify="center">
        <Grid item md>
            <Paper style={{ padding: 20, margin: 120 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...titleProps} />
                    <TextField {...dueDateProps} />
                    <TextField {...emailProps} />
                    <TextField {...goalProps} />
                    <CheckField {...isAnonymousProps} />
                    <AutoCompleteField {...countryProps} />
                    <SelectField {...statusProps}>
                        {
                            ["todas", "en progreso", "completado"].map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)
                        }
                    </SelectField>
                    <Button {...jsonButton} >Enviar</Button>
                </form>
            </Paper>
        </Grid>
    </Grid>);
};

export default CampaignForm;
