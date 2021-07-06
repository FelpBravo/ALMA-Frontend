import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { makeStyles, Tooltip } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from 'constants/constUtil';
import TableActionButton from 'components/search/ui/TableActionButton';
import ModalAcceptDate from './ModalAcceptDate';
import { startDocumentByIdVisibility, startDocumentFlowIdVisibility } from 'actions/documents';
import { startDownloadDocument } from 'actions/search';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import Swal from 'sweetalert2';

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
    const { authUser, authorities } = useSelector(state => state.auth);
    const { fileId,  flowId,  name } = useSelector(state => state.flowDocument);
    const [dateActive, setDateActive] = useState(false)
    const dispatch = useDispatch();
    const { involved } = useSelector(state => state.flowDocument);
    const { document } = involved
  
    const handleOpenDate = () => {
        dispatch(startDocumentFlowIdVisibility(flowId));
        
        setDateActive(true)
    }

    const handleCloseDate = () => {
        setDateActive(false)
    }
 
    const ROLE_FILE_DOWNLOAD = authorities.find(rol => rol === 'ROLE_FILE_DOWNLOAD')

    const handleDownload = async () => {
		if (ROLE_FILE_DOWNLOAD) {
			const resp = await Swal.fire({
				title: 'Descargar',
				text: "¿Está seguro que quiere descargar el documento?",
				icon: "question",
				showCancelButton: true,
				focusConfirm: true,
				heightAuto: false,
			});
			if (resp.value) {
				dispatch(startDownloadDocument(fileId, document?.name))
			}
		}

	}

    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column1" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column2" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column4" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column5" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column6" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column7" />
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
                                    <IntlMessages id="doc.table.column8" />
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                                    <TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor: 'pointer' }}>
                                        {document?.name}
                                    </TableCell>
                                    <TableCell>
                                        {document?.location}
                                    </TableCell>
                                    <TableCell>
                                        {document?.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        {document?.author}
                                    </TableCell>
                                    <TableCell>
                                        {document?.version}
                                    </TableCell>
                                    <TableCell>
                                        {document?.tags}
                                    </TableCell>
                                    <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                                        <div className={classes.iconsHolder}>
                                            <TableActionButton
                                                materialIcon={
                                                    <Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.upload" />}>
                                                    <VisibilityOutlinedIcon
                                                        className={classes.iconos}
                                                        onClick={() => handleOpenDate(fileId)}
                                                    />
                                                    </Tooltip>
                                                }
                                            />
                                            <TableActionButton
													materialIcon={
														<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.upload" />}>
															<SaveAltOutlinedIcon
																className={classes.iconos}
																onClick={() => handleDownload(fileId, document?.name)}
															/>
														</Tooltip>
													}
												/>
                                        </div>
                                        
                                    </TableCell>

                                </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <ModalAcceptDate close={handleCloseDate} open={dateActive} />
        </div>
    )
}

export { DocManagement }