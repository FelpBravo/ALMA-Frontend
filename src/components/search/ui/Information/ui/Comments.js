import { IconButton, TextField, Grid, Button} from '@material-ui/core';
import React from 'react';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    coment: {
        backgroundColor: '#EFF7FF',
        color: '#494B74',
        padding: 10,
        paddingBottom: '1rem',
        borderRadius: 10,
        height: 150,
    },
  }));
  

const Comments = () =>{
    const classes = useStyles();

    const NewComennt = () => {    
        return (
            <div>
            <Grid container>
            <Grid item xs={10}>
               <TextField
                    id="outlined-secondary"
                    label="Escribe nuevo comentario"
                    variant="outlined"
                    color="primary"
                    fullWidth
                />
            </Grid>
            <Grid item xs={2} style={{padding:4}}>
                <IconButton type="submit" style={{background: "#3699FF"}}>
                    <NearMeOutlinedIcon style={{color: "white"}} />
                </IconButton>
            </Grid>   
            </Grid>
            <Grid container>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <AttachFileOutlinedIcon />
                        </IconButton>
                    </label>
					<p style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop:13}}	>
					Adjuntar documento al comentario
					</p>
			</Grid>
            </div>
        )
    }

    return(
    <div>
       <NewComennt/>
       <div className={classes.coment}>
           <span style={{color:"#3699FF"}}>Nadia Gallardo</span>
           <p style={{fontSize: 13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.</p>
           <Grid container>
            <span style={{color:"#3699FF", fontSize: 11}}>Nombre documento adjunto</span>
           </Grid>
        <Grid container style={{fontSize: 14}}>
            <MessageOutlinedIcon fontSize="small" />
            <span>Comentar</span>
        </Grid>
        
       </div>
    </div>
    )

}

export default Comments
