import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';



const SummaryDocument = (props) => {

    const { data} = props
   
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
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                                Tipo
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                                ID
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                                Creación
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                                Responsable
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                               Versión
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
                                Etiquetas
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        

                            <TableRow>
                                <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor:'pointer' }}
                                    
                                >
                                {data?.name}
                                </TableCell>
                                <TableCell>
                                tipo
                                </TableCell>
                                <TableCell>
                                {data?.folderId}
                                </TableCell>
                                <TableCell>
                                creacion
                                </TableCell>
                                <TableCell>
                                {data?.author}
                                </TableCell> 
                                <TableCell>
                                version
                                </TableCell>
                                <TableCell>
                                Etiquetas
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