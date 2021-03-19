import { startSaveAttachmentsLoading } from 'actions/information';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableAttachments from './TableAttachments';


const Attachments = (props) =>{

    const {fileId, authUser} = props
    const dispatch = useDispatch();
    const { attachments = [] } = useSelector(state => state.info);
    
useEffect ( () =>{
     
   dispatch(startSaveAttachmentsLoading(authUser, fileId))

    },[fileId])



return(
    <div className="table-responsive-material">
    <table className="default-table table table-sm table-hover">

        <tbody>
        {attachments.map((
			{   
            id,
			name,
			createdAt,
			createdByUser,
            icon
			}) => {
	    return (

		<tr tabIndex={-1} key={id}>
			<td>
				<div className="user-profile d-flex flex-row align-items-center">
					
					<div className="user-detail">

						<h5 className="user-name custom-color-table">
							
							
							<i className={icon}></i>
						
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
					Descargar documento
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