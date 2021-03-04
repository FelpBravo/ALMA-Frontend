import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { startVersioningLoading ,versioningRemove} from 'actions/search';
import { TableVersioning } from './ui/TableVersioning';
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
			<Button
				style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "Poppins, sans-serif", fontSize: '12px', fontWeight: 600, width:20, height:20 }}
				variant="contained"
				type="submit"
				color="primary"
				fullWidth
				onClick={backGo}
			>
				Volver
			</Button>
			<TableVersioning></TableVersioning>
		</div>
	)
}

export default Versioning;