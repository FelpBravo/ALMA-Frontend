import { Divider, Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { TextField } from 'components/ui/Form';


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

const DocumentInit = ( {commonProps}) => {
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);
    const { docCree } = useSelector(state => state.flowDocument);
    const { id, title, author, owner, almaId } = docCree
    

    return (
        <Grid item md={12} spacing={3} container alignItems="center">
            <Grid item md={12} spacing={3} container alignItems="center">
                <Grid item container md={3}>
                    <h5 className={classes.rolTitle}>Documento Principal</h5>
                </Grid>
            </Grid>
            <Grid item md={12} container spacing={1} alignItems="center">
    
                <Grid item xs={12} container spacing={1}>

                    <Grid item xs={4}>
                        <TextField
                            value={title}
                            label="Seleccionar titulo documento"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={author}
                            label="Autor"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={owner}
                            label="Owner"
                            disabled />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            name="maxDays"
                            label="Plazo en días"
                            type="number"
                            {...commonProps}
                        />
                    </Grid>
                    <Grid item md={1}>

                    </Grid>
                </Grid>

            </Grid>
            <Grid item md={12} className="mt-3 mb-3">
                <Divider />
            </Grid>
        </Grid>)
}

export default DocumentInit;