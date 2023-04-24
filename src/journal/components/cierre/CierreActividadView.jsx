import React from 'react'
import { Box } from '@mui/material';
import CierreActividadViewDetalle from './CierreActividadViewDetalle';

 const CierreActividadView = ( props) => {
  const identificador = props.opcion.substring(0,2);
  const handleChange = (e) =>{
    props.onBorrarInformacionSeleccion();
    //setSheet(e.target.value);
    }
  return (
    <>
    <br></br>
       <Box md={12}>
          <CierreActividadViewDetalle 
           id = {identificador}
           onBorrarInformacion ={(e)=>handleChange(e)}
          />
        </Box>
     
    </>
  )
}
export default CierreActividadView
