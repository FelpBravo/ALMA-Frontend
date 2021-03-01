import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { startVersioningLoading } from 'actions/search'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';



const DataTableVersioning = () => {

	const isMounted = useRef(true)
	const history = useHistory()
	const dispatch = useDispatch()

	const { authUser } = useSelector(state => state.auth)
	const { versioning = {}, documentId = '' } = useSelector(state => state.searchs)
	const { data = [], totalItems = 0 } = versioning


	const [page, setPage] = useState(0)


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleChangePage = (event, page) => {
		dispatch(startVersioningLoading(authUser, page, documentId));
		setPage(page);
	};

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column1" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column2" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column3" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="versioning.table.column4" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="versioning.table.column5" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{data.map(({ name, modifiedAt, modifiedByUser, version, comment }, index) => {
								return <TableRow key={index}>
									<TableCell>{name}</TableCell>
									<TableCell>{new Date(modifiedAt).toLocaleString()}</TableCell>
									<TableCell>{modifiedByUser}</TableCell>
									<TableCell>{version}</TableCell>
									<TableCell>{comment}</TableCell>
								</TableRow>

							})

							}

						</TableBody>
					</Table>
					<Grid className="mt-3 mb-3 mr-3"
						container
						justify="flex-end"
						alignItems="flex-end"

					>
						<Pagination
							style={{ color: '#369bff' }}
							count={Math.ceil(totalItems / 10)}
							color="primary"
							shape="rounded"
							total={totalItems}
							onChange={handleChangePage} />
					</Grid>
				</TableContainer>

			</div>
		</div>
	)
}

export { DataTableVersioning }
