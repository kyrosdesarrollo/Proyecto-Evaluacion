// import { Box, Typography } from '@mui/material';
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import ControlSeleccion from './CierreActividadSeleccion';

//  const CierreActividad = () => {
//   const dispatch = useDispatch();
//   //Extraer información de formatos
//   const { formatos } = useSelector(state => state.formato);
//   const plantilla = Object.assign({},formatos);
//   const opcion = [];
  
//   //Verificación de lineas asignadas para visualización de archivo, mejora incorporar monitor en el filtro
//   //&& detalle.monitor === 'Juan'
  
//   Object.entries(plantilla).forEach(([key, value]) => {
//     const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Cierre').length;
//     if (asignaCount > 0) {
//       opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
//     }
//   });
   
//   return (
//     <>
//      <Box md={1}>
//       <Typography variant="h4" component="h2">
//        Cierre
//       </Typography>
//     </Box>
//       <ControlSeleccion opcion = {opcion} />
//     </>
//   )
// }
// export default CierreActividad

import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './CierreActividadSeleccion';

 const CierreActividad = () => {
  const dispatch = useDispatch();
  //Extraer información de formatos
  const { formatos } = useSelector(state => state.formato);
  //Extraer nombre de usario
  const { displayName } = useSelector(state => state.auth);
  //Extraer perfil de usuario
  const { perfil } = useSelector(state => state.perfil);

  const plantilla = Object.assign({},formatos);
  const opcion = [];
  
  //Verificación de lineas asignadas para visualización de archivo, mejora incorporar monitor en el filtro
 //Validación de perfil  
  if (perfil === "ADMINISTRADOR") {
    Object.entries(plantilla).forEach(([key, value]) => {
      const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Cierre' ).length;
      if (asignaCount > 0) {
        opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
      }
    });
  }
  if (perfil === "MONITOR") {
    console.log('Estoy en Monitor')
    Object.entries(plantilla).forEach(([key, value]) => {
      const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Cierre' && detalle.Monitor === displayName).length;
      if (asignaCount > 0) {
        opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
      }
    });
  }   
  return (
    <>
     <Box md={1}>
      <Typography variant="h4" component="h2">
       Cierre
      </Typography>
    </Box>
      <ControlSeleccion opcion = {opcion} />

    </>
  )
}
export default CierreActividad