import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { makeStyles } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from 'constants/constUtil';
import TableActionButton from 'components/search/ui/TableActionButton';

const useStyles = makeStyles((theme) => ({
    iconsHolder: {
        display: "flex",
        alignItems: "center",
    },
    iconos: {
        cursor: "pointer",
        color: "#2196f3",
        fontSize: '18px',
    },
}));


const DocManagement = () => {

    const classes = useStyles();


    //const handleVisibility = (id, name) => {

    //};    

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
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Ubicación
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    ID
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Creación
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Responsable
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Versión
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Etiquetas
                            </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    Visualización
                            </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>



                            <TableRow>
                                <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor: 'pointer' }}>
                                    Nombre documento
                                </TableCell>
                                <TableCell>
                                    Ubicacion
                                </TableCell>
                                <TableCell>
                                    Folder ID
                                </TableCell>
                                <TableCell>
                                    fecha
                                </TableCell>
                                <TableCell>
                                    Autor
                                </TableCell>
                                <TableCell>
                                    version
                                </TableCell>
                                <TableCell>
                                    Etiquetas
                                </TableCell>
                                <TableCell style={{fontFamily:"Poppins", textAlign:"center"}}>
                                    <div className={classes.iconsHolder}>
                                        <TableActionButton
                                            materialIcon={
                                                <VisibilityOutlinedIcon
                                                    className={classes.iconos}
                                                //onClick={() => handleVisibility(id, name)}
                                                />
                                            }
                                        />
                                    </div>
                                </TableCell>

                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

export { DocManagement }