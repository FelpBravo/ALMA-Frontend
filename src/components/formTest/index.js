import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, SelectField } from 'components/ui/Form';
import schema from './FormTest.schema';
import { Button, Grid, makeStyles, MenuItem, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    input: {
        margin: theme.spacing(0.5, 0)
    },
}));

const CampaignForm = () => {
    const classes = useStyles();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onTouched',
        name: 'nameTest',
        // defaultValues: {},
        resolver: yupResolver(schema),
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


    console.log("emailProps", emailProps)

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
            <Paper style={{ padding: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...titleProps} />
                    <TextField {...emailProps} />
                    <TextField {...goalProps} />
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
