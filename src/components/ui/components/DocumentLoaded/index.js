import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import IconButton from '@material-ui/core/IconButton';
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
    },
    btn: {
        backgroundColor: '#3699FF',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginLeft: theme.spacing(0.5)
    },
    iconRight:{
        fontSize: 18,
    }

}));


export default function DocumentLoaded(props) {
    const classes = useStyles(props);
    return <Grid style={{width:'100%'}} container alignItems="center" justify="center" className={classes.root}>
        <Grid item xs container alignItems="center">
            <DescriptionOutlinedIcon className={classes.text} />
            <h5 className={classes.text}>ALMA-01.00.00.00-001-A-PDF</h5>
        </Grid>          
        <Grid item xs container justify="flex-end">
            <Box className={classes.btn} type="button">
                <VisibilityOutlinedIcon className={classes.iconRight} />
            </Box>
            <Box className={classes.btn} type="button">
                <DeleteOutlineOutlinedIcon className={classes.iconRight} />
            </Box>
        </Grid>
    </Grid>;
}