import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import { TitleCard } from 'components/ui/helpers/TitleCard';

const useStyles = makeStyles((theme) => ({
    
}));
export default function RequestStep() {
    const classes = useStyles();

    return <Grid container spacing={2}>
        <Grid item md={12}>
            <TitleCard message="document.title.requestDocument" />
        </Grid>
    </Grid>
}