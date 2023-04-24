import React from 'react'
import { Box } from '@mui/material';
import AuditoriaActividadViewDetalle from './AuditoriaActividadViewDetalle';

 const AuditoriaActividadView = ( props) => {
  const identificador = props.opcion.substring(0,2);
  const handleChange = (e) =>{
    props.onBorrarInformacionSeleccion();
    //setSheet(e.target.value);
    }
  return (
    <>
    <br></br>
       <Box md={12}>
          <AuditoriaActividadViewDetalle 
            id = {identificador}
            onBorrarInformacion ={(e)=>handleChange(e)}
           />
        </Box>
     
    </>
  )
}
export default AuditoriaActividadView
