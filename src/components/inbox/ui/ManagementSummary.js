import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Divider, Grid } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { SummaryDocument } from 'components/documents/ui/SummaryDocument';
import { SummaryInvolved } from 'components/documents/ui/SummaryInvolved';



const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const ManagementSummary = () => {
	const dispatch = useDispatch();
	const { id } = useParams()
	const { authUser } = useSelector(state => state.auth);
	
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	return (

		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<Grid container className="mt-2">

						<Grid item xs={11}>
							<h3 className="mb-0">
								<IntlMessages id="Revisión de documento" />
							</h3>
						</Grid>
					</Grid>

                    <SummaryDocument/>

                    <Divider className="mt-3 mb-3"/>
                    <h3>Involucrados</h3> 

                    <SummaryInvolved/>


                    <Divider className="mt-3 mb-3"/>
                    <h3>Observaciones Generales</h3>
e
                    <Divider className="mt-3 mb-3"/>
                    <h3>Solicitud de revisión</h3>


					<Grid container 
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