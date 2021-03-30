import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Button from 'components/ui/Button'
import GetAppIcon from '@material-ui/icons/GetApp';
import AlmaLogo from 'assets/images/alma-logo.jpg';

export default function DownloadFilePage() {
    return <Grid container alignItems="center" justify="center" >
        <Grid item md={8}>
        <Paper elevation={3} style={{ padding: 32 }}>
            <Grid direction="column" spacing={8} container alignItems="center" justify="center" >
                <Grid item md>
                    <img style={{ height: 250 }} src={AlmaLogo} alt="alma logo" />
                </Grid>
                <Grid item md>
                    <h1>Legend of Zelda.pdf</h1>
                </Grid>
                <Grid item md>
                    <Button
                        fullWidth
                        startIcon={<GetAppIcon size="large" />}
                        variant="contained"
                        size="large"
                        color="secondary">Descargar</Button>
                </Grid>
            </Grid>
        </Paper>
        </Grid>
    </Grid>
}