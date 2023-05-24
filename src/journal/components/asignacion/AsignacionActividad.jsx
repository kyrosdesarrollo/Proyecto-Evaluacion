import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import ControlSeleccion from './AsignacionActividadSeleccion';

 const AsignacionActividad = (props) => {
  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({},formatos);
  const [valueCampana, setValueCampana] = React.useState(null);
  //Llenado de combobox en constante opcion
  const opcion =['']; 
  let campanaTipo = '';
  //Trae información desde AsignacionActividadSelecciion que es CAMPAÑA
  const handleSeleccionCampaña = (seleccionCampaña) => {
    // Hacer algo con el valor seleccionado de la campaña
    setValueCampana(seleccionCampaña)
    console.log("Selección de campaña:", seleccionCampaña);
  };
  
  
  const filtrarPlantilla = (plantilla) => {
  const formatos = Object.assign({}, plantilla);
  const filteredOptions = Object.keys(formatos).filter((key) => {
  const detalleJson = formatos[key].detalleJson;

    const totalRegistros = detalleJson.length;
    let asignaCount = 0;

    for (let i = 0; i < totalRegistros; i++) {
      if (detalleJson[i].Estado === 'Asigna') {
        asignaCount++;
      }
    }

    return detalleJson && formatos[key].estado === 'Asigna' && asignaCount > 0;
  });

  const filteredPlantilla = {};
  filteredOptions.forEach((key) => {
    filteredPlantilla[key] = formatos[key];
  });

  return filteredPlantilla;
};

  if (valueCampana) {
    Object.keys(plantilla).forEach((e) => {
      const detalleJson = plantilla[e].detalleJson;
      if (detalleJson && Object.keys(detalleJson).length > 0) {
        const tieneEstadoCarga = Object.values(detalleJson).some((detalle) => detalle.Estado === 'Carga');
        // Agregar condición para verificar el campo "campania"
        if (tieneEstadoCarga && plantilla[e].campania === valueCampana) {
          opcion.push(e + ' FORMATO [ ' + plantilla[e].formato + ' ]  CARGADO POR [ ' + plantilla[e].nombre +' ]');
        } 
      }
    });
    
  }

  return (
    <>
     <Box md={12}>
      <Typography variant="h4" component="h2">
        Asignación de Actividad
      </Typography>
    </Box>
      <ControlSeleccion opcion = {opcion} onSeleccionCampaña={handleSeleccionCampaña} />
    </>
  )
}
export default AsignacionActividad