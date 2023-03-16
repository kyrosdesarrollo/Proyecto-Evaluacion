import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './AsignacionActividadSeleccion';

 const AsignacionActividad = () => {
   const dispatch = useDispatch();



  const { formatos } = useSelector(state => state.formato);
  
  console.log('Estoy en Detalle')
 
  const head   =  formatos[0].detalle[0];
  const detail =  formatos[0];
  console.log(detail.detalle);

//   console.log('Estoy en Asignacion y es objecto')
//   console.log(Object.assign({},formatos));
  const plantilla = Object.assign({},formatos);
  
  const opcion =['']; 
  Object.keys(plantilla).forEach((e) => { 
 
  opcion.push( e + ' FORMATO [ ' + plantilla[e].formato + ' ]  CARGADO POR [ ' + plantilla[e].nombre.displayName +' ]');
   });

  //  Object.values(plantilla).map(e => 
  //   console.log(e.detalle)
  //  );
  // const todoItems = Object.values(plantilla).map((todo, index) =>
  // // Only do this if items have no stable IDs 
  //  <li key={index}>    {todo.text}
  // </li>
  // );
  // console.log('Todo')
  // console.log(todoItems);
//   console.log(todoItems);
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