import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TwitterPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { 
  closeModalTags, saveTagsLoaded, startCreateTagsLoading, startEditTagsLoading 
} from 'actions/tags';
import IntlMessages from 'util/IntlMessages';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import { DialogTitle } from '@material-ui/core';

const fieldName = <IntlMessages id="tags.modal.field.name" />

const ModalTags = () => {

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal, actionModal, tags , tagslist = [] } = useSelector(state => state.tags);

  const [color, setColor] = useState('#fff');

  const [value, setValue] = useState('');

  const [messageErrorName, setMessageErrorName] = useState(null);


  useEffect(() => {

    if (actionModal === ACTION_EDIT) {

      const { hex = '#fff', tag = '' } = tags;

      setColor(hex);

      setValue(tag);

    }

  }, [actionModal, tags, setColor, setValue]);

  useEffect(() => {

    if (!value || value.length < 3) {

      setMessageErrorName('Este campo debe tener mínimo 3 letras');

    } else
     {
      const searchtag = tagslist.find(list=>list.tag === value)
      if(searchtag)
      {
        if(searchtag.id === tags.id)
        {
          setMessageErrorName(null);
        }
        else
        {
          setMessageErrorName('Nombre de la etiqueta tiene que ser unico');
        }
          
      }
      else
      {
        setMessageErrorName(null);
      }
        
        

    }

  }, [value, setMessageErrorName]);

  const handleClose = () => {

    dispatch(closeModalTags());
    
    dispatch(saveTagsLoaded());

    setValue('');

  }

  const handleOnChange = ({ target: { value } }) => {
    setValue(value)
  }

  const handleOnSave = () => {
    if (actionModal === ACTION_CREATE) {

      dispatch(closeModalTags());
      dispatch(startCreateTagsLoading(authUser, value, color));

    } else {

      dispatch(closeModalTags());
      dispatch(startEditTagsLoading(tags.id, value, color));

    }

  }

  const handleOnChangeColor = ({ hex }) => {
    setColor(hex);

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
        <div className="jr-card-header d-flex align-items-center">
         
            {
              actionModal === ACTION_CREATE
                ? <IntlMessages id="tags.modal.title.create" />
                : <IntlMessages id="tags.modal.title.edit" />
            }
          
        </div>
          
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

          <span className="text-danger text-error">{messageErrorName}</span>

          <h3 className='mt-3'>Color de etiqueta</h3>

          <TwitterPicker value={color} onChange={handleOnChangeColor} />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleOnSave}
            variant="contained"
            color="primary"
            autoFocus
            disabled={messageErrorName}
          >
            
            {
              actionModal === ACTION_EDIT 
              ? 
              'Editar' 
              : 
              'Guardar'
            }

          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalTags;