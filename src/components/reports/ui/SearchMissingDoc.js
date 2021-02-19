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

const SearchMissingDoc = () => {

	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory();
	const { authUser } = useSelector(state => state.auth)

	const [missingDate, setMissingDate] = useState('')
	const [missingName, setMissingName] = useState('')
	const [disabledButton, setDisabledButton] = useState(false);
	const [messageError, setMessageError] = useState('');

	
	useEffect(()=>{
		dispatch(clearReports())
	},[])

	/* useEffect(() => {
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


	}, [missingDate]) */

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
							label="Nombre/Rut cliente"
							variant="outlined"
							fullWidth
							//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
							value={missingName || ''}
							size="small"
							InputLabelProps={{
								shrink: true,
							}
							}
							onChange={event => setMissingName(event.target.value)}
						/>

					</Grid>
					<Grid item xs={3}>
						<TextField
							label="Desde"
							variant="outlined"
							fullWidth
							type="date"
							value={missingDate.startDate || ''}
							size="small"
							InputLabelProps={{
								shrink: true,
							}
							}
							onChange={event => setMissingDate({ startDate: event.target.value, endDate: missingDate.endDate })}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							label="Hasta"
							variant="outlined"
							fullWidth
							type="date"
							value={missingDate.endDate || ''}
							size="small"
							InputLabelProps={{
								shrink: true,
							}
							}
							onChange={event => setMissingDate({ startDate: missingDate.startDate, endDate: event.target.value })}
						/>
					</Grid>
					<br />
					<span className="text-danger text-error">{messageError}</span>
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

export default SearchMissingDoc;