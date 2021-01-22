import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TwitterPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalTags } from 'actions/tags';


const useStyles = makeStyles((theme) => ({
	root: {
	flexGrow: 1,
	marginTop: 30,
	},
	demo: {
	backgroundColor: theme.palette.background.paper,
	},
	title: {
	margin: theme.spacing(4, 0, 2),
	},
	}));

const ModalTags = () => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();

    const { openModal } = useSelector(state => state.tags);


    const handleClose = () => {

      dispatch(closeModalTags());
  
    }
 
	return (
	
	<div>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      
        <DialogContent>
          <DialogContentText>
          <h3>Crear etiqueta</h3>
          <TextField
          id="outlined-margin-dense"
          defaultValue="Nombre de etiqueta"
          margin="dense"
          variant="outlined"
          fullWidth
          />
          
          <h3 className='mt-3'>Color de etiqueta</h3>
          <TwitterPicker/>
          </DialogContentText>
        </DialogContent>
       
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained" color="primary">
           Cancelar
          </Button>
          <Button onClick={handleClose}variant="contained" color="primary" autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
       					
	)
}

export default ModalTags;