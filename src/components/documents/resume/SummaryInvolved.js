import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { get } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

import IntlMessages from 'util/IntlMessages';

const SummaryInvolved = ({ data }) => {
    console.log('approves', data)
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="Nombre documento" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} >
                                    Nombre
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} >
                                    Plazo
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} >
                                    Comentarios
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map(({ users, role }, index) =>
                                    users.map(({ userId, comment, maxDays }) => {

                                        return <TableRow key={index} >
                                            <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}>
                                                {role}
                                            </TableCell>
                                            <TableCell>
                                                {userId}
                                            </TableCell>
                                            <TableCell>
                                                {maxDays}
                                            </TableCell>
                                            <TableCell>
                                                {comment}
                                            </TableCell>
                                        </TableRow>
                                    }))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

export { SummaryInvolved }