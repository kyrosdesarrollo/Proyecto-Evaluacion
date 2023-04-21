import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import ControlSeleccion from './AsignacionActividadSeleccion';

 const AsignacionActividad = () => {

  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({},formatos);
  //Llenado de combobox en constante opcion
  const opcion =['']; 
 try {
 
  Object.keys(plantilla).forEach((e) => { 
        opcion.push( e + ' FORMATO [ ' + plantilla[e].formato + ' ]  CARGADO POR [ ' + plantilla[e].nombre +' ]');
   });
  return (
    <>
     <Box md={12}>
      <Typography variant="h4" component="h2">
        Asignación de Actividad
      </Typography>
    </Box>
      <ControlSeleccion opcion = {opcion} />
    </>
  )
}
export default AsignacionActividad