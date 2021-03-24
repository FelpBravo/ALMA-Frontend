import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startPreviewDocument } from 'actions/search';


const Preview = (props) => {
  const { authUser, id, name } = props

 
  const dispatch = useDispatch();
  const { previewDocument } = useSelector(state => state.searchs);
  const { file , type } = previewDocument

  const [pdf, setPDF] = useState('')

  useEffect(() => {
    dispatch(startPreviewDocument(authUser, id))
  }, [])

  const getPDF = async () => {
    setPDF('')
    if (file) {
    setPDF(URL.createObjectURL(new Blob([file], { type: 'application/pdf' })));
    }
  }

  useEffect(() => {
  getPDF()
  }, [file])


  if (pdf != '') {
    return (
    <div style={{ width: '100%', height: '600px' }}>
     { <object
      data={pdf}
      type={type}
      name='prueba'
      width="100%"
      height="80%"
      >
      <iframe src={pdf} width="100%" height="600px">
        <a href={pdf} id="enlaceDescargarPdf"
        download={name}
        >Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo</a>
      </iframe>

      </object>}
    </div>


    )
  }
  else {
    return (<><p>Cargando...</p></>)
  }

}

export default Preview