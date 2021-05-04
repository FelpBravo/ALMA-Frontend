import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    divider: {
        margin: theme.spacing(3, 0),
    },
}));

export default function LoadingView() {
    const classes = useStyles();
    return (<Grid container className={classes.root}>
        {[1, 2, 3].map(e => <div key={e} className={classes.root}>
            <Skeleton variant="rect" width={50} height={50} />
            <Skeleton animation="wave" />
            <Skeleton />
            <Skeleton />
             <Divider className={classes.divider} />
        </div>)}
    </Grid>);
}
