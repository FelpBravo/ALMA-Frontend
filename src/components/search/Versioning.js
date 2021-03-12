import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation , useParams} from 'react-router-dom';
import { Button, Grid} from '@material-ui/core';
import { startVersioningLoading ,versioningRemove} from 'actions/search';
import { TableVersioning } from './ui/TableVersioning';
import IntlMessages from 'util/IntlMessages';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const Versioning = () => {
	const dispatch = useDispatch();
	const { id } = useParams()
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();


		console.log('ID!',id);

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	useEffect(() => {
		if (id.length < 10) {
			return;
		}
		dispatch(startVersioningLoading(authUser,1, id))



	}, [dispatch, id]);

	const handleBackGo = ()=>{
		dispatch(versioningRemove())
		history.goBack()
	}

	return (
	
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					
						<Grid container className="mt-2">

							<Grid item xs={11}>
							<h3 className="mb-0">
						      <IntlMessages id="versioning.modal.title" />
						    </h3>
							</Grid>

							

						</Grid>
				<TableVersioning/>
				<Grid container>
					<KeyboardBackspaceIcon 
					onClick={handleBackGo}
					color='primary'/>
					<p style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 500, color: "#3699FF", marginTop:2}}	>
					Volver
					</p>
			    </Grid>
				</div>
				
			</div>
			
			
		</div>
		
		
			
			
		
	)
}

export default Versioning;