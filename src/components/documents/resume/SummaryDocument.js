import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

import { FORMAT_YYYY_MM_DD } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

const SummaryDocument = ({ data }) => {

    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="table.search.documentName" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column2" />
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="table.search.createdAt" />
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="versioning.table.column3" />
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="table.search.version" />
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="table.No.tags" />
                            </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>



                            <TableRow>
                                <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor: 'pointer' }}

                                >
                                    {data?.name}
                                </TableCell>
                                <TableCell>
                                    {data?.pathFolderName}
                                </TableCell>
                                <TableCell>
                                    {moment().format(FORMAT_YYYY_MM_DD)}
                                </TableCell>
                                <TableCell>
                                    {data?.author}
                                </TableCell>
                                <TableCell>
                                    1.0
                                </TableCell>
                                <TableCell>
                                    {data?.tagsField}
                                </TableCell>

                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

export { SummaryDocument }