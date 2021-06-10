import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Divider, Grid } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { SummaryDocument } from 'components/documents/resume/SummaryDocument';
import { SummaryInvolved } from 'components/documents/resume/SummaryInvolved';
import { TextField } from 'components/ui/Form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const ManagementSummary = () => {
	const dispatch = useDispatch();
	const { id } = useParams()
	const { authUser } = useSelector(state => state.auth);
	const { involved } = useSelector(state => state.flowDocument);

	const [value, setValue] = React.useState(null);
	
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	const handleChange = (event) => {
		setValue(event.target.value);
	  };


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

                    <SummaryDocument/>

                    <Divider className="mt-3 mb-3"/>
                    <h3>Involucrados</h3> 

                    <SummaryInvolved data={involved}/>


                    <Divider className="mt-3 mb-3"/>
                    <h3>Observaciones Generales</h3>

					<Grid container item xs={12}>
						<TextField
						name="comment"
						label="Comentario"
						multiline
						rows={3}
						//value={data?.comment}
						/>
					</Grid>

                    <Divider className="mt-3 mb-3"/>
                    <h3>Solicitud de revisión</h3>
					
					<p>Nombre te ha solicitado revisar este documento, en el rol ...</p>
					<p>El plazo de esta solicitud vence el....</p>

					<FormControl>
						<FormLabel>Revisión OK</FormLabel>
						<RadioGroup value={value} onChange={handleChange}>
							<FormControlLabel  value="Si" control={<Radio color="primary" /> } label="Si" />
							<FormControlLabel value="No" control={<Radio color="primary"/>} label="No" />
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
						//value={data?.comment}
						/>
					</Grid>

				
					<Grid container 
					className="mt-3 mb-3"
                    //onClick={handleBackGo}
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