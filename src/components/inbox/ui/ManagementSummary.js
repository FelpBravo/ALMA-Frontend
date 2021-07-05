import { Button, Divider, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { manageSetValueField, startAcceptTasksInit } from 'actions/flowDocument';
import { SummaryInvolved } from 'components/documents/resume/SummaryInvolved';
import { TextField } from 'components/ui/Form';
import IntlMessages from 'util/IntlMessages';

import { DocManagement } from './DocManagement';

const ManagementSummary = () => {

	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const { involved, taskId, role, author, expiresAt, fileId, flowId } = useSelector(state => state.flowDocument);
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
		handleBackGo()
	}
	const handleEdit = e => {
		console.log(`/document/${fileId}/edit/${flowId}`)
		history.push(`/document/${fileId}/edit/${flowId}`);
	}

	const handleChangeRedux = ({ target }) => {
		const { name, value } = target;
		dispatch(manageSetValueField(name, value));
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
							name="approverComment"
							label="Comentario"
							multiline
							rows={3}
							onChange={handleChangeRedux}
						/>
					</Grid>

					<Divider className="mt-3 mb-3" />
					<Grid container
						className="mt-3 mb-3"
					>
						<Grid item md={2}>
							
							<Button onClick={handleBackGo} startIcon={<KeyboardBackspaceIcon color='primary' />}>
									Volver
							</Button>
			
							
						</Grid>
						<Grid item xs>
							<Grid
								container
								justify="flex-end"
								alignItems="flex-end"
								spacing={2}
							>
								{value === "false" && (role === "owner" || role === "author") &&
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