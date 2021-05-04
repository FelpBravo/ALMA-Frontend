import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

export default () => <Grid container direction="column" alignItems="center" justify="center">
    <Skeleton variant="rect" width={410} height={418} />
    <Skeleton variant="text" width={410} style={{ marginTop: 10 }} />
    <Skeleton variant="rect" width={410} height={68} style={{ marginTop: 10 }} />
</Grid>