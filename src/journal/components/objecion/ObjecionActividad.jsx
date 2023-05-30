import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ControlSeleccion from './ObjecionActividadSeleccion';

 const ObjecionActividad = () => {
  const dispatch = useDispatch();
  //Extraer información de formatos
  const { formatos } = useSelector(state => state.formato);
  //Extraer perfil de usuario
  const { perfil } = useSelector(state => state.perfil);

  const plantilla = Object.assign({},formatos);
  const opcion = [];

  const [valueCampana, setValueCampana] = React.useState(null);
  //Trae información desde AsignacionActividadSelecciion que es CAMPAÑIA
  const handleSeleccionCampaña = (seleccionCampaña) => {
    // Hacer algo con el valor seleccionado de la campaña
    setValueCampana(seleccionCampaña)
  };
  //Verificación de lineas asignadas para visualización de archivo, mejora incorporar monitor en el filtro
 //Validación de perfil  
 if (valueCampana) {
    if (perfil === "ADMINISTRADOR" || perfil === "CALIDAD") {
      Object.entries(plantilla).forEach(([key, value]) => {
        const asignaCount = value.detalleJson.filter((detalle) => detalle.Estado === 'Finalizado' ).length;
        // Agregar condición para verificar el campo "campania"
        if (asignaCount > 0 && value.campania === valueCampana) {
          opcion.push(`${key} FORMATO [ ${value.formato} ] CARGADO POR [ ${value.nombre} ]`);
        }
      });
    }
}
  return (
    <>
     <Box md={1}>
      <Typography variant="h4" component="h2">
       Objeción
      </Typography>
    </Box>
      <ControlSeleccion 
        opcion = {opcion} 
        onSeleccionCampaña={handleSeleccionCampaña}
        />
    </>
  )
}
export default ObjecionActividad