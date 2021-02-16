import React, { useEffect } from 'react';
import DateSearchReports from './ui/DateSearchReports.js';
import { TableSearchReports } from './ui/TableSearchReports';
import { useDispatch, useSelector } from 'react-redux';


const Reports = () => {
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	return (
		<div>
			<DateSearchReports />
			<TableSearchReports />
		</div>
	)
}

export default Reports;