import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, SelectField } from 'components/ui/Form';
import schema from './FormTest.schema';
import { Button, Grid, makeStyles, MenuItem, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(1)
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

    const titleProps = {
        label: 'Título de campaña',
        name: 'title',
        register,
        shrink: true,
        size: 'small',
        errors,
        className: classes.input
    };

    const emailProps = {
        label: 'Correo electronico',
        name: 'email',
        register,
        shrink: true,
        size: 'medium',
        errors,
        className: classes.input
    };

    const goalProps = {
        type: 'number',
        label: 'Cantidad ($)',
        name: 'goal',
        register,
        size: 'medium',
        shrink: true,
        errors,
        className: classes.input
    };

    const statusProps = {
        label: 'Estado',
        name: 'status',
        className: classes.input,
        shrink: true,
        register,
        control,
        errors
    };


    console.log("emailProps", emailProps)

    const onSubmit = values => {
        console.log("values", values)
        alert(JSON.stringify(values))
    };

    const jsonButton = {
        variant:"outlined",
        color:"primary",
        type:"submit"
    }

    return (<Grid container alignItems="center" justify="center">
        <Grid item md>
            <Paper style={{ padding: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...titleProps} />
                    <TextField {...emailProps} />
                    <TextField {...goalProps} />
                    <SelectField {...statusProps}>
                        <MenuItem key="todas" value="todas">Todas</MenuItem>
                        <MenuItem key="in_progress" value="in_progress">En progreso</MenuItem>
                        <MenuItem key="completed" value="completed">Completadas</MenuItem>
                    </SelectField>
                    <Button {...jsonButton} >Enviar</Button>
                </form>
            </Paper>
        </Grid>
    </Grid>);
};

export default CampaignForm;
