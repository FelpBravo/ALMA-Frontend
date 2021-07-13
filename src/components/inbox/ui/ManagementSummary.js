import { Button, Divider, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CommentRoleInit, manageSetValueField, startAcceptTasksInit } from 'actions/flowDocument';
import { SummaryInvolved } from 'components/documents/resume/SummaryInvolved';
import { TextField } from 'components/ui/Form';
import IntlMessages from 'util/IntlMessages';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import { DocManagement } from './DocManagement';
import ModalComments from './ModalComments';

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},

}));

const ManagementSummary = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const { involved, taskId, role, author, expiresAt, fileId, flowId } = useSelector(state => state.flowDocument);
	const { comment, approves, users } = involved

	const [value, setValue] = React.useState(null);

	const history = useHistory();

	const [name, setName] = useState()
	const [file, setFile] = useState()
	const [dateActive, setDateActive] = useState(false)
	const [commentCreate, setCommentCreate] = useState();


	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleBackGo = () => {
		history.goBack()
	}

	const handleAcceptTask = () => {
		if (role === "owner" || role === "author") {
			dispatch(startAcceptTasksInit(authUser, taskId, value === "true", commentCreate, role, approves, file))
			handleBackGo()
		}
		else {
			dispatch(startAcceptTasksInit(authUser, taskId, value === "true", commentCreate, role, [], file))
			handleBackGo()
		}
	}
	const handleEdit = e => {
		history.push(`/document/${fileId}/edit/${flowId}`);
	}

	const handleChangeRedux = ({ target }) => {
		const { name, value } = target;
		setCommentCreate(value)
		dispatch(manageSetValueField(name, value));
	}

	const handleChangeFile = (event) => {
		event.preventDefault();
		setName(event.target.files[0].name)
		setFile(event.target.files[0])
	}

	const handleClear = () => {
		setFile()
		setName()
	}
	const handleOpenComment = () => {
		dispatch(CommentRoleInit(authUser, flowId, role))
		setDateActive(true)
	}
	const handleCloseComment = () => {
		setDateActive(false)
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
					{(role === "owner" || role === "author") &&
						<div>
							<Divider className="mt-3 mb-3" />
							<h3>Involucrados</h3>

							<SummaryInvolved />
						</div>
					}

					{(role === "coAutor" || role === "stakeholder" || role === "reiewed" || role === "approved" || role === "released") &&
						<div>
							<Divider className="mt-3 mb-3" />
							<h3>Comentario del autor</h3>

							<Grid container item xs={12}>
								{users.filter(user => user.role === role).map(result => (
									<TextField
										name="comment"
										multiline
										rows={3}
										value={result.comment}
										disabled
									/>
								))
								}
							</Grid>
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
					<Grid container >
						<Grid item xs={2}>
							<h3>Comentarios sobre la tarea</h3>
						</Grid>
						<Grid item xs={2}>
							<Link
								style={{ fontSize: '12px' }}
								component="button"
								variant="body2"
								onClick={handleOpenComment}
							>
								Ver más comentarios
							</Link>

						</Grid>
					</Grid>

					<Grid container item xs={12}>
						<TextField
							name="comment"
							label="Escribe tus cometarios"
							multiline
							rows={3}
							onChange={handleChangeRedux}
						/>
					</Grid>
					<Grid container className="mt-1">
						<label >

							<AttachFileOutlinedIcon fontSize="small" color="primary" />

							<span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13, cursor: 'pointer' }}>{file ? '' : <IntlMessages id="comment.attachment.title" />}</span>
							<input
								className={classes.input}
								type="file"
								onChange={handleChangeFile}

							/>
						</label>

						<span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13 }}>{file ? <>{name}<ClearIcon fontSize="small" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={handleClear} /></> : ''}</span>


					</Grid>

					<Divider className="mt-3 mb-3" />
					<Grid container
						className="mt-3 mb-3"
					>
						<Grid item md={2}>
							<Button
								variant="text"
								color="primary"
								size="large"
								onClick={handleBackGo}
							>
								<KeyboardBackspaceIcon color="primary" style={{ marginRight: 10 }} />
								<IntlMessages id="dashboard.button.back" />
							</Button>
						</Grid>
						<Grid item xs>
							<Grid
								container
								justify="flex-end"
								alignItems="flex-end"
								spacing={2}
							>
								{value === "false" && role === "owner" &&
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

								{role === "author" &&
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
			<ModalComments close={handleCloseComment} open={dateActive} />

		</div>





	)
}

export default ManagementSummary;