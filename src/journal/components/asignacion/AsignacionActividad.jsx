import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './AsignacionActividadSeleccion';
import { Button } from '@material-ui/core';

 const AsignacionActividad = () => {
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
        Asignación de Actividad
      </Typography>
      <Button aria-label='test'></Button>
    </Box>
      <ControlSeleccion opcion = {opcion} />

    </>
  )
}
export default AsignacionActividad