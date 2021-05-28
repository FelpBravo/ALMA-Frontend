import { DialogTitle, Divider, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, {  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from 'components/ui/Form';
import IntlMessages from 'util/IntlMessages';

import { SummaryDocument } from './SummaryDocument';
import { SummaryInvolved } from './SummaryInvolved';
import { startInitFlowsLoading } from 'actions/flowDocument';

const ModalLoadFlow = ({ data, close, open }) => {

  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);

  const handleClose = () => {
    close()
  }

  const handleInitFlow = () => {
    dispatch(startInitFlowsLoading(authUser, data))
    close()
  }

  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
          <div style={{ fontFamily: 'Poppins', fontSize: "16px" }}>
            <IntlMessages id="document.loadDocuments.request.summary.title" />
          </div>
        </DialogTitle>

        <DialogContent>
          <SummaryDocument data={data?.document} />

          <Divider className="mt-3 mb-3" />

          <h3>
            <IntlMessages id="document.loadDocuments.request.summary.involved" />
          </h3>

          <SummaryInvolved data={data?.approves} />


          <Divider className="mt-3 mb-3" />

          <h3>
            <IntlMessages id="document.loadDocuments.request.summary.general.remarks" />
          </h3>

          <Grid container item xs={12}>
            <TextField
              name="comment"
              label="Comentario"
              multiline
              rows={3}
              value={data?.comment}
            />
          </Grid>

        </DialogContent>

        <DialogActions>

          <Button
            style={{
              backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
              boxShadow: "none", height: '45px', width: '120px'
            }}
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            <IntlMessages id="document.loadDocuments.request.summary.button.cancel" />
          </Button>

          <Button
            style={{
              fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
            }}
            onClick={handleInitFlow}
            variant="contained"
            color="primary"
          // disabled={messageErrorName}
          >
            <IntlMessages id="document.loadDocuments.request.summary.button.confirm" />
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalLoadFlow;