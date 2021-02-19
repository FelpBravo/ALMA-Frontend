import { Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { clearReports, startMissingLoading } from 'actions/reports'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const SearchWithout = () => {

	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory();
	const { authUser } = useSelector(state => state.auth)

	const [missingDate, setMissingDate] = useState('')
	const [missingName, setMissingName] = useState('')
	const [disabledButton, setDisabledButton] = useState(true);
	const [messageError, setMessageError] = useState('');

	
	useEffect(()=>{
		dispatch(clearReports())
	},[])

	useEffect(() => {
		if (!missingDate.endDate || !missingDate.startDate) {
			setDisabledButton(true);
			setMessageError('');
			return;
		}
		if (new Date(missingDate.endDate).getTime() < new Date(missingDate.startDate).getTime()) {
			setDisabledButton(true);
			setMessageError(`La fecha de inicio ${missingDate.startDate} no puede ser mayor a la final ${missingDate.endDate} `);
			return
		}
		setDisabledButton(false);
		setMessageError('');


	}, [missingDate])

	const handleAdvanceSearchClear = () => {
		setMissingDate({ startDate: '', endDate: '' })
		setMissingName('')
		dispatch(clearReports())
		setDisabledButton(true)
	}

	const handleSearchReports = (e) => {
		e.preventDefault();
		dispatch(startMissingLoading(authUser, missingName, missingDate.startDate, missingDate.endDate, 1))
		//history.push(`/reports`);

	}



	return (
		<div>
			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="reports.missing.documents" />
				</h3>
			</div>

			<Grid item xs={12}>

				<Grid container spacing={3}>
					<Grid item xs={3}>
						<TextField
							label="Nombre"
							variant="outlined"
							fullWidth
                            value=''
							size="small"
							InputLabelProps={{
								shrink: true,
							}
							}
							//onChange={event => setMissingName(event.target.value)}
						/>

					</Grid>		
				</Grid>



				<Grid
					container
					justify="flex-end"
					alignItems="flex-end"
					className="mt-3"
				>
					<div className={classes.buttons}>
						<Button
							style={{
								backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
								boxShadow: "none", height: '45px', width: '120px'
							}}
							type="button"
							variant="contained"
							onClick={handleAdvanceSearchClear}
						>
							<IntlMessages id="dashboard.advancedSearchClear" />
						</Button>

						<Button
							style={{
								fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
								boxShadow: "none", height: '45px', width: '120px'
							}}
							disabled={disabledButton}
							type="submit"
							variant="contained"
							color="primary"
							onClick={handleSearchReports}
						>
							<IntlMessages id="Generar" />
						</Button>
					</div>

				</Grid>
			</Grid>
		</div>




	)
}

export default SearchWithout;