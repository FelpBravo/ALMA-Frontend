import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Divider, Grid } from '@material-ui/core';
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
import IntlMessages from 'util/IntlMessages';

const ManagementSummary = () => {

	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const { involved, taskId, role, author, expiresAt, fileId, instaceId } = useSelector(state => state.flowDocument);
	const { comment } = involved

	const [value, setValue] = React.useState(null);

	const history = useHistory();


	{/*useEffect(() => {

		if (value !== null) {
			dispatch(startAcceptTasksInit(authUser, taskId, value === "true", comment, role))
			return;
		}

	}, [dispatch, value, authUser]);*/}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleBackGo = () => {
		history.goBack()
	}
	const handleAcceptTask = () => {
		dispatch(startAcceptTasksInit(authUser, taskId, value === "true", comment, role))
	}
	const handleEdit = () => {
		history.push(`/document/${fileId}/edit/${instaceId}`);
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

					<DocManagement />

					<Divider className="mt-3 mb-3" />
					<h3>Información general del flujo</h3>

					<Grid container item xs={12}>
						<TextField
							name="comment"
							multiline
							rows={3}
							value={comment}
							disabled
						/>
					</Grid>
					{role === "owner" &&
						<div>
							<Divider className="mt-3 mb-3" />
							<h3>Involucrados</h3>

							<SummaryInvolved />
						</div>
					}





					<Divider className="mt-3 mb-3" />
					<h3>Solicitud de revisión</h3>
					<p className="user-description">
								<span className="owner-most-viewed-documents">{author}</span>
								{` te ha solicitado revisar este documento, en el rol `}
								<span className="owner-most-viewed-documents">{role}</span>
					</p>
					<p className="user-description">
					{`El plazo de esta solicitud vence el `}
								<span className="owner-most-viewed-documents">{expiresAt}</span>
					</p>
				
					<FormControl>
						<FormLabel color="primary" >Aprobar Tarea</FormLabel>
						<RadioGroup value={String(value)} onChange={handleChange}>
							<FormControlLabel value="true" control={<Radio color="primary" />} label="Si" />
							<FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
						</RadioGroup>
					</FormControl>

					<Divider className="mt-3 mb-3" />
					<h3>Observaciones</h3>

					<Grid container item xs={12}>
						<TextField
							name="comment"
							label="Comentario"
							multiline
							rows={3}

						/>
					</Grid>

					<Divider className="mt-3 mb-3" />
					<Grid container
						className="mt-3 mb-3"
						onClick={handleBackGo}
					>
						<Grid item md>
							<KeyboardBackspaceIcon
								color='primary' />
							<span style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 500, color: "#3699FF", marginTop: 2 }}	>
								Volver
						</span>
						</Grid>
						<Grid item xs>
							<Grid
								container
								justify="flex-end"
								alignItems="flex-end"
								spacing={2}
							>
								{value === "false" &&
									<Button
										className="mr-3"
										style={{
											backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
											boxShadow: "none", height: '45px', width: '120px'
										}}
										onClick={handleEdit}
										variant="contained"
										color="primary"
									>Editar</Button>}

								<Button
									style={{
										fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
									}}
								    onClick={handleAcceptTask}
									variant="contained"
									color="primary">

									Completar tarea</Button>

							</Grid>
						</Grid>
					</Grid>
				</div>

			</div>


		</div>





	)
}

export default ManagementSummary;