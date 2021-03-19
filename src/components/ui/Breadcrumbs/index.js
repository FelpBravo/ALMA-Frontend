import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withProps } from 'recompose';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
            fontSize:100
        },
        
    },

    separator:{
        fontSize:35
    },
    li:{
        marginTop:5
    }
}));

const BreadCrumbs = (props) => {
    const { bread } = props
    const history = useHistory();
    const { breadcrumbs = [] } = useSelector(state => state.crumbs);
    const classes = useStyles();

  /*   if(bread && bread.length > 0){
        breadcrumbs = bread
    } */

  

    const handleGoingTo = (path) => {
       history.push(path)
    }

    return (
        <>

            {breadcrumbs.length > 0 &&
                <Grid item xs={11}>
                    <div className={classes.root}>
                        <Breadcrumbs separator="›" classes={{ separator:classes.separator, li:classes.li }} aria-label="breadcrumb">
                            {breadcrumbs.map((x, index) => {
                                if (index === (breadcrumbs.length - 1)) {
                                    return <Typography key={index} color="textPrimary">{x.name}</Typography>
                                }
                                return (<Link key={index} style={{ cursor: "pointer", color: "#2196f3" }}  onClick={() => handleGoingTo(x.path)} >{x.name}</Link>)
                            })}

                        </Breadcrumbs>
                    </div>
                </Grid>
            }

        </>
    )
}

export default BreadCrumbs