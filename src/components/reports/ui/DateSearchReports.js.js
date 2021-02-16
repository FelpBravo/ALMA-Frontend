import { Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { startReportsLoading} from 'actions/reports'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const DateSearchReports = () => {

	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory();
	const { authUser } = useSelector(state => state.auth)

	const [reportsDate, setReportsDate] = useState('')
	const [disabledButton, setDisabledButton] = useState(true);
	const [messageError, setMessageError] = useState('');

	useEffect(() => {
		if (!reportsDate.endDate || !reportsDate.startDate) {
			setDisabledButton(true);
			setMessageError('');
			return;
		}
		if (new Date(reportsDate.endDate).getTime() < new Date(reportsDate.startDate).getTime()) {
			setDisabledButton(true);
			setMessageError(`La fecha de inicio ${reportsDate.startDate} no puede ser mayor a la final ${reportsDate.endDate} `);
			return
		}
		setDisabledButton(false);
		setMessageError('');


	}, [reportsDate])

	const handleAdvanceSearchClear = () => {
		setReportsDate({ startDate: '', endDate: '' })
		setDisabledButton(true)
	}

	const handleSearchReports = (e) => {
		e.preventDefault();
		dispatch(startReportsLoading(authUser, reportsDate.startDate, reportsDate.endDate, 1))
		history.push(`/reports`);
	}



	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<div className="jr-card-header d-flex align-items-center">
								<h3 className="mb-0">
									<IntlMessages id="reports.title" />
								</h3>
							</div>
							<Grid item xs={12}>

								<Grid container>
									<Grid item xs={3}>
										<TextField
											label="Desde"
											variant="outlined"
											fullWidth
											type="date"
											//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
											value={reportsDate.startDate || ''}
											size="small"
											InputLabelProps={{
												shrink: true,
											}
											}
											onChange={event => setReportsDate({ startDate: event.target.value, endDate: reportsDate.endDate })}
										/>
									</Grid>
									<Grid className="ml-3" item xs={3}>
										<TextField
											label="Hasta"
											variant="outlined"
											fullWidth
											type="date"
											value={reportsDate.endDate || ''}
											size="small"
											InputLabelProps={{
												shrink: true,
											}
											}
											onChange={event => setReportsDate({ startDate: reportsDate.startDate, endDate: event.target.value })}
										/>
									</Grid>
									<br />
									<span className="text-danger text-error">{messageError}</span>
								</Grid>

								<Divider className="mt-3" />

								<Grid
									container
									justify="flex-end"
									alignItems="flex-end"
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
											<IntlMessages id="dashboard.advancedSearchText" />
										</Button>
									</div>

								</Grid>
							</Grid>


						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default DateSearchReports;