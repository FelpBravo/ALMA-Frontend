import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, {  } from 'react';

import IntlMessages from 'util/IntlMessages';

const SummaryInvolved = ({ data }) => {
    
    
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="Rol" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Usuario
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Plazo de revisión
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Comentarios
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (data || []).map(({ users, role }, index) =>
                                    users.map(({ userId, comment, maxDays }) => {

                                        return <TableRow key={index} >
                                            <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}>
                                                {role}
                                            </TableCell>
                                            <TableCell>
                                                {userId}
                                            </TableCell>
                                            <TableCell>
                                                {maxDays} días
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