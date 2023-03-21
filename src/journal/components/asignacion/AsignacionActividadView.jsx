import React from 'react'
import { Box } from '@mui/material';
import AsignaciónActividadViewDetalle from './AsignaciónActividadViewDetalle';

 const AsignacionActividadView = ( {opcion = ''}) => {
  const identificador = opcion.substring(0,2);
  return (
    <>
    <br></br>
       <Box md={12}>
          <AsignaciónActividadViewDetalle id = {identificador}/>
        </Box>
     
    </>
  )
}
export default AsignacionActividadView
