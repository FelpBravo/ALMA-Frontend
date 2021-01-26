import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TwitterPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalTags, startCreateTagsLoading, startEditTagsLoading } from 'actions/tags';
import IntlMessages from 'util/IntlMessages';
import { ACTION_CREATE } from 'constants/constUtil';
import { DialogTitle } from '@material-ui/core';


const fieldName = <IntlMessages id="tags.modal.field.name" />


const ModalTags = () => {

    const dispatch = useDispatch();

    const { openModal, actionModal, tags} = useSelector(state => state.tags);

    const [formValues, setFormValues] = useState({});
    const [color, setColor] = useState('#fff');
    const [value, setValue] = useState('');
  

    useEffect(() => {

      setFormValues({ ...tags });
  
    }, [tags]);
  
    const handleClose = () => {

      dispatch(closeModalTags());
  
    }

    const handleOnChange = ({ target: { value } }) => {
      setValue(value)
    }
    
    const handleOnSave = (id) => {
  
      if (actionModal === ACTION_CREATE) {
  
        dispatch(closeModalTags());
        dispatch(startCreateTagsLoading(value, color));
  
      } else {
  
        dispatch(closeModalTags());
        dispatch(startEditTagsLoading(value, color, id));
  
      }
  
    }
 
	return (
	
	<div>
      <Dialog
				open={openModal}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
			>

        <DialogTitle id="form-dialog-title">
					{
						actionModal === ACTION_CREATE
							? <IntlMessages id="tags.modal.title.create"/>
							: <IntlMessages id="tags.modal.title.edit" />
					}
				</DialogTitle>
      
        <DialogContent>
         
             <TextField
								value={value}
								autoFocus
								label={fieldName}
								type="text"
								variant="outlined"
								fullWidth
								size="small"
								onChange={handleOnChange}
							/>
          
          <h3 className='mt-3'>Color de etiqueta</h3>
          <TwitterPicker  value={color} onChangeComplete={(color => setColor(color.hex))}/>
         
          {
						actionModal !== ACTION_CREATE
						&&
						<div className="row mt-3">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">
								<h4>{<IntlMessages id="folders.modal.field.state" />}</h4>
							</div>
						</div>
					}
         
         
        </DialogContent>
       
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained" color="primary">
           Cancelar
          </Button>
          <Button onClick={handleOnSave} variant="contained" color="primary" autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
       					
	)
}

export default ModalTags;