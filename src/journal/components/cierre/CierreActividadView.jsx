import React from 'react'
import { Box } from '@mui/material';
import CierreActividadViewDetalle from './CierreActividadViewDetalle';

 const CierreActividadView = ( {opcion = ''}) => {
  const identificador = opcion.substring(0,2);

  return (
    <>
    <br></br>
       <Box md={12}>
          <CierreActividadViewDetalle id = {identificador}/>
        </Box>
     
    </>
  )
}
export default CierreActividadView
