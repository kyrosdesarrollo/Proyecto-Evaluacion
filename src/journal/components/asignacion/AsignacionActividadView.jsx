import React from 'react'
import { Box } from '@mui/material';
import AsignaciónActividadViewDetalle from './AsignaciónActividadViewDetalle';

 const AsignacionActividadView = (props , {opcion = ''}) => {
  const identificador = opcion.substring(0,2);
  

  const handleChange = (e) =>{
    console.log('Borrar hijo View')
    props.onBorrarInformacionSeleccion();
    //setSheet(e.target.value);
    }
    
  return (
    <>
    <br></br>
       <Box md={12}>
          <AsignaciónActividadViewDetalle 
           id = {identificador} 
           onBorrarInformacion ={(e)=>handleChange(e)} 
           />
        </Box>
     
    </>
  )
}

export default AsignacionActividadView