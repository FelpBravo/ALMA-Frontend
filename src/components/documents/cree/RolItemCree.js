import { Divider, Grid, Hidden, IconButton, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';


import Button from 'components/ui/Button';
import { AutoCompleteField, TextField } from 'components/ui/Form';
import { getUsersFilter } from 'services/usersService';
import { postFlowsSearch } from 'services/flowDocumentService';
import { get } from 'lodash';

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
        //setValue(`approves[${index}].role`, rolName);
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
                name={`documents[${index}].type`}
                value={rolName}
                style={{ display: 'none' }}
                {...commonProps} />
            {
                fields.map((field, item) => (
                    <Grid item xs={12} container spacing={1} key={field.id}>
                        <Grid item xs={4}>
                            <AutoCompleteField
                                name={`${name}[${item}].id`}
                                label="Seleccionar titulo documento"
                                getUrl={getTitle}
                                renderOption={(option) => {
                                    setValue(`documents[${index}].documents[${item}].owner`, option["owner"]);
                                    setValue(`documents[${index}].documents[${item}].author`, option["author"]);
                                    return`${option["title"]} (${option["almaId"]})`
                                    
                                 } }
                                optionsLabel="title"
                                optionsValue="id"
                                getValues={getValues}
                                {...commonProps} 
                                />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                value={get(getValues(),`documents[${index}].documents[${item}].author`)}
                                label="Autor"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }
                                }
                                disabled
                                 />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                value={get(getValues(),`documents[${index}].documents[${item}].owner`)}
                                //console={console.log("nuevo",get(getValues(),`documents[${index}].documents[${item}].owner`))}
                                label="Owner"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }
                                }
                                disabled
                                />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                name={`${name}[${item}].maxDays`}
                                label="Plazo en días"
                                type="number"
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
        <Grid item md={12} className="mt-3 mb-3">
            <Divider />
        </Grid>
    </Grid>)
}

export default RolItemCree;