import { Divider, Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { countries } from 'components/formTest/countries';
import Button from 'components/ui/Button';
import { AutoCompleteField, TextField } from 'components/ui/Form';
import { getUsersFilter } from 'services/usersService';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
        fontSize: 11
    }
}));

const RolItem = ({ name, control, commonProps, rolName, index, setValue, mandatory }) => {
    const { fields, append, remove } = useFieldArray({
        name,
        control
    });
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);

    useEffect(() => {
        setValue(`approves[${index}].role`, rolName);
        mandatory && append({})
    }, [])

    const addField = e => {
        e.preventDefault()
        append({})
    }

    const getUsers = userName => getUsersFilter({ authUser, search: userName })

    return (<Grid item md={12} spacing={3} container alignItems="center">
        <Grid item md={12} spacing={3} container alignItems="center">
            <Grid item container md={3}>
                <h5 className={classes.rolTitle}>{rolName}</h5>
                <p className={classes.rolSubTitle}>{mandatory ? "(Requerido)" : "(Opcional)"}</p>
            </Grid>
            <Grid item md={1}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={addField}>
                    Agregar
            </Button>
            </Grid>
        </Grid>
        <Grid item md={12} container spacing={1} alignItems="center">
            {
                fields.map((field, index) => (
                    <Grid item md={12} container spacing={1} key={field}>
                        <TextField
                            name={`${name}[${index}].order`}
                            label="Plazo en días"
                            value={parseInt(index + 1)}
                            type="number"
                            style={{ display: 'none' }}
                            {...commonProps} />
                        <Grid item md={3}>
                            <AutoCompleteField
                                name={`${name}[${index}].userId`}
                                label="Seleccionar nombre"
                                getUrl={getUsers}
                                renderOption={(option) => (
                                    `${option["firstName"]} ${option["lastName"]} (${option["id"]})`
                                )}
                                optionsLabel="id"
                                optionsValue="id"
                                {...commonProps} />
                        </Grid>
                        <Grid item md={2}>
                            <TextField
                                name={`${name}[${index}].maxDays`}
                                label="Plazo en días"
                                type="number"
                                {...commonProps} />
                        </Grid>
                        <Grid item md>
                            <TextField
                                name={`${name}[${index}].comment`}
                                label="Comentario"
                                {...commonProps} />
                        </Grid>
                        <Grid item md={1}>
                            {
                                (mandatory && fields.length === 1) 
                                ? null
                                : <IconButton onClick={() => remove(index)} aria-label="delete">
                                    <DeleteIcon color="primary" fontSize="small" />
                                </IconButton>
                            }
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

export default RolItem;