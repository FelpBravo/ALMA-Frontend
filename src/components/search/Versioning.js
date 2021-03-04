import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Button} from '@material-ui/core';

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

		if (document.length === 0) {
			return;
		}




	}, [dispatch, document]);



	return (
		<div className="row">
			<p>Prueba</p>
			<Button
				style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "Poppins, sans-serif", fontSize: '12px', fontWeight: 600, }}
				variant="contained"
				type="submit"
				color="primary"
				fullWidth
			>
				Volver
			</Button>
		</div>
	)
}

export default Versioning;