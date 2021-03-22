import { startSaveAttachmentsLoading } from 'actions/information';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import { makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import { startDownloadDocument } from 'actions/search';
import { Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

const useStyles = makeStyles((theme) => ({

	iconos: {
	  cursor: "pointer",
	  color: "#2196f3",
	  fontSize: '18px',
	},
    input: {
        display: 'none',
      },
	
  }));



const Attachments = (props) =>{

    const classes = useStyles();
    const {fileId, authUser} = props
    const dispatch = useDispatch();
    const { attachments = [] } = useSelector(state => state.info);
    
useEffect ( () =>{
     
   dispatch(startSaveAttachmentsLoading(authUser, fileId))

    },[fileId])

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
			dispatch(startDownloadDocument(id,name))
		}

	}

return(
    <div className="table-responsive-material">
    <div className="mt-2">
    <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span"
        startIcon={<CloudUploadIcon />}>
          Cargar Archivo
        
        </Button>
      </label>
    </div>

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
							
							
                        <DescriptionOutlinedIcon color="primary"/>
						
							{` ${name} `}
						</h5>
							<p className="user-description">
								{`Subido por `}
								<span className="owner-most-viewed-documents">{createdByUser}</span>
								{`, ${createdAt}`}
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
})}
        </tbody>
    </table>
</div>

)
}

export default Attachments