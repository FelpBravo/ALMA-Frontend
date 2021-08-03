import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, {  } from 'react';
import { useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';

const SummaryInvolved = ({ data }) => {

    const { involved } = useSelector(state => state.flowDocument);
    const { users } = involved
    
    
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="flow.rol" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="users.table.column1" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="flow.days" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="dashboard.comments" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (data || [])?.map(({ users, role }, index) =>
                                    users?.map(({ userId, comment, maxDays }) => {

                                        return <TableRow key={index} >
                                            <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}>
                                                {role}
                                            </TableCell>
                                            <TableCell>
                                                {userId}
                                            </TableCell>
                                            <TableCell>
                                                {maxDays} <IntlMessages id="flow.day" />
                                            </TableCell>
                                            <TableCell>
                                                {comment}
                                            </TableCell>
                                        </TableRow>
                                    }))
                            }

                                 {!data && users?.map(({ userId, comment, expiresAt, role}, index) => {

                                        return <TableRow key={index} >
                                            <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}>
                                                {role}
                                            </TableCell>
                                            <TableCell>
                                                {userId}
                                            </TableCell>
                                            <TableCell>
                                                {expiresAt} <IntlMessages id="flow.day" />
                                            </TableCell>
                                            <TableCell>
                                                {comment}
                                            </TableCell>
                                        </TableRow>
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

export { SummaryInvolved }