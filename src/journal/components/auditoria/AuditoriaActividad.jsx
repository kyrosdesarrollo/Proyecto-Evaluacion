import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './AuditoriaActividadSeleccion';

 const AuditoriaActividad = () => {
  const dispatch = useDispatch();
  //Extraer información de formatos
  const { formatos } = useSelector(state => state.formato);
  //Extraer nombre de usario
  const { displayName } = useSelector(state => state.auth);
  //Extraer perfil de usuario
  const { perfil } = useSelector(state => state.perfil);
  const [valueCampana, setValueCampana] = React.useState(null);

  const plantilla = Object.assign({},formatos);
  const opcion = [];
  //Trae información desde AsignacionActividadSelecciion que es CAMPAÑIA
  const handleSeleccionCampaña = (seleccionCampaña) => {
    // Hacer algo con el valor seleccionado de la campaña
    setValueCampana(seleccionCampaña)
  };
  //Verificación de lineas asignadas para visualización de archivo, mejora incorporar monitor en el filtro
 //Validación de perfil  
 if (valueCampana) {
        if (perfil === "ADMINISTRADOR") {
          Object.entries(plantilla).forEach(([key, value]) => {
            const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Asigna').length;
            // Agregar condición para verificar el campo "campania"
            if (asignaCount > 0 && value.campania === valueCampana) {
              opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
            }
          });
        }
        if (perfil === "MONITOR") {

          Object.entries(plantilla).forEach(([key, value]) => {
            const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Asigna' && detalle.Monitor === displayName).length;
            if (asignaCount > 0) {
              opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
            }
          });
        }   
}

  return (
    <>
     <Box md={1}>
      <Typography variant="h4" component="h2">
       Evaluación
      </Typography>
    </Box>
      <ControlSeleccion opcion = {opcion} onSeleccionCampaña={handleSeleccionCampaña}/>

    </>
  )
}
export default AuditoriaActividad