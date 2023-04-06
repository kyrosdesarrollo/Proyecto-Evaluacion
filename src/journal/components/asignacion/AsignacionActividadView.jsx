import React from 'react'
import { Box } from '@mui/material';
import AsignaciónActividadViewDetalle from './AsignaciónActividadViewDetalle';

 const AsignacionActividadView = (props) => {
  //const identificador = opcion.substring(0,2);
  const handleChange = (e) =>{
    props.onBorrarInformacionSeleccion();
    //setSheet(e.target.value);
    }
    
  return (
    <>
    <br></br>
       <Box md={12}>
          <AsignaciónActividadViewDetalle 
           id = {props.opcion} 
           onBorrarInformacion ={(e)=>handleChange(e)} 
           />
        </Box>
     
    </>
  )
}

export default AsignacionActividadView
