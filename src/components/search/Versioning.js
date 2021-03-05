import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { startVersioningLoading ,versioningRemove} from 'actions/search';
import { TableVersioning } from './ui/TableVersioning';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const Versioning = () => {
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	const { document = '' } = queryString.parse(location.search);


	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	useEffect(() => {

		if (document.length < 10) {
			return;
		}
		dispatch(startVersioningLoading(authUser,1, document))



	}, [dispatch, document]);

	const handleBackGo = ()=>{
		dispatch(versioningRemove())
		history.goBack()
	}


	return (
	
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					
						<Grid container spacing={2} className="mt-3">

							<Grid item xs={10}>
							<h3 className="mb-0">
						      <IntlMessages id="versioning.modal.title" />
						    </h3>
							</Grid>

							<Grid item xs={2}>
								<Button
									style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, width:80, height:30 }}
									variant="contained"
									type="submit"
									color="primary"
									fullWidth
									onClick={handleBackGo}
								>
									Volver
								</Button>
							</Grid>

						</Grid>
				 <TableVersioning/>
				</div>
			</div>
		</div>
		
		
			
			
		
	)
}

export default Versioning;