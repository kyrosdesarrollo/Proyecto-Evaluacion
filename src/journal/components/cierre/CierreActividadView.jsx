import React from 'react'
import { Box } from '@mui/material';
import AuditoriaActividadViewDetalle from './CierreActividadViewDetalle';

 const CierreActividadView = ( {opcion = ''}) => {
  const identificador = opcion.substring(0,2);

  return (
    <>
    <br></br>
       <Box md={12}>
          <AuditoriaActividadViewDetalle id = {identificador}/>
        </Box>
     
    </>
  )
}
export default CierreActividadView
