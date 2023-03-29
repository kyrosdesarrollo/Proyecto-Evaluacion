import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './AuditoriaActividadSeleccion';

 const AuditoriaActividad = () => {
  const dispatch = useDispatch();
  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({},formatos);
  
  const opcion =['']; 
  Object.keys(plantilla).forEach((e) => { 
        opcion.push( e + ' FORMATO [ ' + plantilla[e].formato + ' ]  CARGADO POR [ ' + plantilla[e].nombre.displayName +' ]');
   });

  return (
    <>
     <Box md={12}>
      <Typography variant="h4" component="h2">
       Auditoria
      </Typography>
    </Box>

      <ControlSeleccion opcion = {opcion} />

    </>
  )
}
export default AuditoriaActividad