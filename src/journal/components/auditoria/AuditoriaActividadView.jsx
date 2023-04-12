import React from 'react'
import { Box } from '@mui/material';
import AuditoriaActividadViewDetalle from './AuditoriaActividadViewDetalle';

 const AuditoriaActividadView = ( {opcion = ''}) => {
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
export default AuditoriaActividadView
