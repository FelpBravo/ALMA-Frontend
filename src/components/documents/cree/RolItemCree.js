import { Divider, Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Button from 'components/ui/Button';
import { AutoCompleteField, TextField } from 'components/ui/Form';
import { getUsersFilter } from 'services/usersService';
import { postFlowsSearch } from 'services/flowDocumentService';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
        textTransform: "capitalize"
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
        fontSize: 11
    }
}));

const RolItemCree = ({ name, control, commonProps, rolName, index, setValue, mandatory, getValues }) => {
    const { fields, append, remove } = useFieldArray({
        name,
        control
    });
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);

    useEffect(() => {
        // setValue(`approves[${index}].role`, rolName);
        mandatory && append({})
    }, [rolName])

    const addField = e => {
        e.preventDefault()
        append({})
    }

    const getTitle = userName => postFlowsSearch({ authUser, text: userName })

    return (
    <Grid item md={12} spacing={3} container alignItems="center">
        <Grid item md={12} spacing={3} container alignItems="center">
            <Grid item container md={3}>
                <h5 className={classes.rolTitle}>{rolName}</h5>
                <p className={classes.rolSubTitle}>{mandatory ? "(Requerido)" : "(Opcional)"}</p>
            </Grid>
            <Grid item md={1}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={addField}>
                    Agregar
            </Button>
            </Grid>
        </Grid>
        <Grid item md={12} container spacing={1} alignItems="center">
            <TextField
                name={`approves[${index}].role`}
                value={rolName}
                style={{ display: 'none' }}
                {...commonProps} />
            {
                fields.map((field, index) => (
                    <Grid item xs={12} container spacing={1} key={field.id}>
                        <TextField
                            name={`${name}[${index}].order`}
                            value={parseInt(index + 1)}
                            type="number"
                            style={{ display: 'none' }}
                            {...commonProps} />
                        <Grid item xs={4}>
                            <AutoCompleteField
                                name={`${name}[${index}].userId`}
                                label="Seleccionar titulo documento"
                                getUrl={getTitle}
                                renderOption={(option) => (
                                    `${option["title"]} (${option["almaId"]})`
                                )}
                                optionsLabel="title"
                                optionsValue="id"
                                getValues={getValues}
                                {...commonProps} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                name={`${name}[${index}].author`}
                                label="Autor"
                                {...commonProps} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                name={`${name}[${index}].owner`}
                                label="Owner"
                                {...commonProps} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                name={`${name}[${index}].maxDays`}
                                label="Plazo en días"
                                type="number"
                                {...commonProps} />
                        </Grid>
                        {/*<Grid item md={5} sm={12} xs={12}>
                            <TextField
                                name={`${name}[${index}].comment`}
                                label="Comentario"
                                {...commonProps} />
                        </Grid>*/}
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
        <Grid item md={12} className="mt-3 mb-3">
            <Divider />
        </Grid>
    </Grid>)
}

export default RolItemCree;