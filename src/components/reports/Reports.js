import React, { useEffect } from 'react';
import DateSearchReports from './ui/DateSearchReports.js';
import { TableSearchReports } from './ui/TableSearchReports';



const Reports = () => {

	return (
		<div>
			<DateSearchReports />
			<TableSearchReports />
		</div>
	)
}

export default Reports;