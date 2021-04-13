import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import AlmaLogo from 'assets/images/alma-logo.jpg';
import IntlMessages from 'util/IntlMessages';
import { RedOrange } from 'helpers/themes/indigoTheme';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: RedOrange
    },
    text: {
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
    }
}));

export default function ExpiredFile() {
    const classes = useStyles()

    return <Grid direction="column" spacing={8} container alignItems="center" justify="center" >
        <Grid item md>
            <img style={{ height: 250 }} src={AlmaLogo} alt="alma logo" />
        </Grid>
        <Grid item md className={classes.root}>
            <h1 className={classes.text}>
                <IntlMessages id="downloadFile.shared.expired.title" />
            </h1>
            <h5 className={classes.text}>
                <IntlMessages id="downloadFile.shared.expired.subtitle" />
            </h5>
        </Grid>
    </Grid>

}