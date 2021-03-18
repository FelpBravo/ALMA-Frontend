import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import clsx from  'clsx';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#E1F0FF',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5)
    },
    text: {
        color: '#3699FF',
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    btn: {
        backgroundColor: '#3699FF',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginLeft: theme.spacing(0.5)
    },
    iconRight: {
        fontSize: 18,
    },
    ellipsis:{
        overflow: 'hidden',
    },
    itemContainer: {
        display: 'flex', 
        alignItems:'center'
    }
}));


export default function DocumentLoaded({ name, ...props }) {
    const classes = useStyles(props);
    return <Grid  className={classes.root} wrap="nowrap" container alignItems="center" justify="space-between">
            <div className={clsx(classes.itemContainer, classes.ellipsis)}>
                <DescriptionOutlinedIcon className={classes.text} />
                <h5 className={classes.text}>{name}</h5>
            </div>
            <div className={classes.itemContainer}>
                <Box className={classes.btn} type="button">
                    <VisibilityOutlinedIcon className={classes.iconRight} />
                </Box>
                <Box className={classes.btn} type="button">
                    <DeleteOutlineOutlinedIcon className={classes.iconRight} />
                </Box>
            </div>
    </Grid>;
}