import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import IntlMessages from 'util/IntlMessages';

import { startVersioningLoading, versioningRemove } from '../../../../actions/search';
import BreadCrumbs from '../../../ui/Breadcrumbs'
import { TableVersioning } from './ui/TableVersioning';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const Versioning = () => {
	const dispatch = useDispatch();
	const { id } = useParams()
	const { authUser } = useSelector(state => state.auth);
	const { breadcrumbs = []} = useSelector(state => state.crumbs);
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	useEffect(() => {
		if (id.length < 10) {
			return;
		}
		dispatch(startVersioningLoading(authUser, 1, id))



	}, [dispatch, id]);

	const handleBackGo = () => {
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
					<BreadCrumbs/>

					<TableVersioning />
					<Grid style={{ cursor: 'pointer'}} container onClick={handleBackGo}>
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

export default Versioning;