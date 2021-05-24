import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import TableActionButton from 'components/search/ui/TableActionButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { deleteGroupLoading, groupSearchLoading, membersGroupInitLoading, startGroupInitLoading } from 'actions/adminUsersAndGroup';
import { useLocation } from 'react-router';


const resumen = [
    { title: 'The Shawshank Redemption', year: 1994 },

];


const SummaryDocument = () => {


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
                            <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400,}} >
                                Ubicación
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400,  }} >
                                Creación
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, }} >
                                Responsable
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400,  }} >
                               Versión
                            </TableCell>
                            <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, }} >
                                Etiquetas
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {resumen.map(({ title, year }, index) => {

                            return <TableRow key={index} >
                                <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor:'pointer' }}
                                    
                                >
                                {title}
                                </TableCell>
                                <TableCell>
                                {year}
                                </TableCell>
                                <TableCell>
                                creacion
                                </TableCell>
                                <TableCell>
                                responsable
                                </TableCell> 
                                <TableCell>
                                version
                                </TableCell>
                                <TableCell>
                                Etiquetas
                                </TableCell>

                            </TableRow>
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    </div>
	)
}

export { SummaryDocument }