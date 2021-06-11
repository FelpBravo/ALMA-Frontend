import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Divider, Grid } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { SummaryInvolved } from 'components/documents/resume/SummaryInvolved';
import { TextField } from 'components/ui/Form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DocManagement } from './DocManagement';
import { startAcceptTasksInit } from 'actions/flowDocument';


const ManagementSummary = () => {
    
	const dispatch = useDispatch();
	//const { id } = useParams()
	const { authUser } = useSelector(state => state.auth);
	const { involved, taskId, role, author  } = useSelector(state => state.flowDocument);
	const {comment } = involved
	
	

	const [value, setValue] = React.useState(null);
	console.log(value)
	const history = useHistory();
	

	useEffect(() => {

		if (value !== null) {
			dispatch(startAcceptTasksInit(authUser, taskId, value === "true", comment, role))
			return;
		}

	}, [dispatch, value, authUser]);

	const handleChange = (event) => {
		setValue(event.target.value);
		//dispatch(startAcceptTasksInit(authUser, taskId, value === "true", comment, role))
	  };

	const handleBackGo = () => {
		history.goBack()
	}



	return (

		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<Grid container className="mt-2 mb-3">

						<Grid item xs={11}>
							<h3 className="mb-0">
								<IntlMessages id="Revisión de documento" />
							</h3>
						</Grid>
					</Grid>

                    <DocManagement/>

                    <Divider className="mt-3 mb-3"/>
                    <h3>Involucrados</h3> 

                    <SummaryInvolved/>


                    <Divider className="mt-3 mb-3"/>
                    <h3>Observaciones Generales</h3>

					<Grid container item xs={12}>
						<TextField
						name="comment"
						label="Comentario"
						multiline
						rows={3}
						value={comment}
						disabled
						/>
					</Grid>

                    <Divider className="mt-3 mb-3"/>
                    <h3>Solicitud de revisión</h3>
					
					<p>{author} te ha solicitado revisar este documento, en el rol {role}</p>
					<p>El plazo de esta solicitud vence el....</p>

					<FormControl>
						<FormLabel>Revisión OK</FormLabel>
						<RadioGroup value={String(value)} onChange={handleChange}>
							<FormControlLabel  value="true" control={<Radio color="primary" /> } label="Si" />
							<FormControlLabel value="false" control={<Radio color="primary"/>} label="No" />
						</RadioGroup>
                    </FormControl>					

					<Divider className="mt-3 mb-3"/>
                    <h3>Observaciones</h3>

					<Grid container item xs={12}>
						<TextField
						name="comment"
						label="Comentario"
						multiline
						rows={3}
						
						/>
					</Grid>

				
					<Grid container 
					className="mt-3 mb-3"
                    onClick={handleBackGo}
                    >
						<KeyboardBackspaceIcon
							color='primary' />
						<span style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 500, color: "#3699FF", marginTop: 2 }}	>
							Volver
						</span>
					</Grid>
				</div>

			</div>


		</div>





	)
}

export default ManagementSummary;