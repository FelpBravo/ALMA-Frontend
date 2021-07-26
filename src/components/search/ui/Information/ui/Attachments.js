import { startSaveAttachmentsLoading, startUploadAttachments } from 'actions/information';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import { makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import { startDownloadDocument } from 'actions/search';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { NewReleasesOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

  iconos: {
    cursor: "pointer",
    color: "#2196f3",
    fontSize: '18px',
  },
  input: {
    display: 'none'
  },

}));



const Attachments = (props) => {

  const classes = useStyles();
  const { fileId, authUser } = props
  const dispatch = useDispatch();
  const { attachments = [] } = useSelector(state => state.info);
  const [file, setFile] = useState()
  const [name, setName] = useState()

  const { authorities } = useSelector(state => state.auth);
  const ROLE_FILE_ATTACHMENT_UPLOAD = authorities.find(rol => rol === 'ROLE_FILE_ATTACHMENT_UPLOAD')

  useEffect(() => {

    dispatch(startSaveAttachmentsLoading(authUser, fileId))

  }, [fileId])

  const handleDownload = async (id, name) => {

    const resp = await Swal.fire({
      title: 'Descargar',
      text: "¿Está seguro que quiere descargar el documento?",
      icon: "question",
      showCancelButton: true,
      focusConfirm: true,
      heightAuto: false,
    });
    if (resp.value) {
      dispatch(startDownloadDocument(id, name))
    }

  }
  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.files[0].name)
    setFile(event.target.files[0])
  }

  const handleUploadAttach = () => {
    dispatch(startUploadAttachments(authUser, fileId, file))
    handleClear()

  }

  const handleClear = () => {
    setFile()
    setName()
  }

  return (
    <div className="table-responsive-material">
      <div className="mt-2" style={{ marginBottom: 10 }}>
      {(ROLE_FILE_ATTACHMENT_UPLOAD) &&
        <div>
        
          <input
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="contained-button-file">
            {!file &&
              <Button variant="contained" component="span"
                startIcon={<SearchIcon />}
                style={{background:"#E1F0FF", fontFamily:"Poppins", fontSize:14, color:'#3699FF', width:200, padding: 6}}
              >
                Adjuntar

              </Button>
            }
          </label>
          {file &&
            <Button variant="contained" color="primary" component="span"
              startIcon={<CloudUploadIcon />}
              onClick={handleUploadAttach}
            >
              Cargar Archivo

            </Button>
          }
        </div>
      }
      </div>
      <span style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, color: "#808080", marginTop: 15, marginLeft: 10 }}>{file ? <>{name}<ClearIcon fontSize="small" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={handleClear} /></> : ''}</span>

      <div  style={{ maxHeight: '650px', overflow: 'auto' }}> 
      <table className="default-table table table-sm table-hover mt-3">
        <tbody>
          {attachments.map((
            {
              id,
              name,
              createdAt,
              createdByUser,

            }) => {
            return (

              <tr tabIndex={-1} key={id}>
                <td>
                  <div className="user-profile d-flex flex-row align-items-center">

                    <div className="user-detail">

                      <h5 className="user-name custom-color-table">


                        <DescriptionOutlinedIcon color="primary" />

                        {` ${name} `}
                      </h5>
                      <p className="user-description">
                        {`Subido por `}
                        <span className="owner-most-viewed-documents">{createdByUser}</span>
                        {`, ${new Date(createdAt).toLocaleString()}`}
                      </p>

                    </div>
                  </div>
                </td>
                <td className="status-cell">

                  <SaveAltOutlinedIcon
                    color="primary"
                    onClick={() => handleDownload(id, name)}
                  />

                </td>

              </tr>
            )
          }).reverse()}
        </tbody>
      </table>
      </div>
    </div>

  )
}

export default Attachments