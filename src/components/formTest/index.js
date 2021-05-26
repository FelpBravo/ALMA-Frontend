import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControlLabel, Grid, makeStyles, MenuItem, Paper, Radio } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { AutoCompleteField, CheckField, DateField, RadioGroupField, SelectField, TextField } from 'components/ui/Form';
import { VERSION_TYPE_MAJOR, VERSION_TYPE_MINOR } from 'constants/constUtil';

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
    const [resolver, setResolver] = useState(null)
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onTouched',
        name: 'nameTest',
        defaultValues: {
            title: "SHDDH",
            country: "AE",
            // dueDate: moment("2021-05-12T04:00:00.000+0000").format('YYYY-MM-DD')
        },
        resolver: resolver ? yupResolver(resolver ) : null,
        criteriaMode: "all",
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

    return (<Grid container alignItems="center" justify="center">
        <Grid item md>
            <Paper style={{ padding: 20, margin: 120 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...titleProps} />
                    <DateField {...dueDateProps} />
                    <TextField {...emailProps} />
                    <TextField {...goalProps} />
                    <CheckField {...isAnonymousProps} />
                    <AutoCompleteField {...countryProps} />
                    <RadioGroupField
                        label="Versionamiento"
                        {...commonProps}
                        name="version">
                        <FormControlLabel
                            value={VERSION_TYPE_MAJOR}
                            control={<Radio color="primary" />}
                            label="MAYOR"
                        />
                        <FormControlLabel
                            value={VERSION_TYPE_MINOR}
                            control={<Radio color="primary" />}
                            label="MENOR"
                        />
                    </RadioGroupField>
                    <SelectField {...statusProps}>
                        {
                            ["todas", "en progreso", "completado"].map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)
                        }
                    </SelectField>
                    <Button onClick={() => setResolver(schema)}>Cambiar schema</Button>
                    <Button {...jsonButton} >Enviar</Button>
                </form>
            </Paper>
        </Grid>
    </Grid>);
};

export default CampaignForm;
