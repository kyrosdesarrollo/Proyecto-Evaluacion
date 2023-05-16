import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import ControlSeleccion from './AsignacionActividadSeleccion';

 const AsignacionActividad = () => {
  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({},formatos);
  //Llenado de combobox en constante opcion
  const opcion =['']; 
console.log('Estoy en asigna')
console.log(plantilla)

const filtrarPlantilla = (plantilla) => {
  const formatos = Object.assign({}, plantilla);
  const filteredOptions = Object.keys(formatos).filter((key) => {
    const detalleJson = formatos[key].detalleJson;
    console.log(detalleJson);

    const totalRegistros = detalleJson.length;
    let asignaCount = 0;

    for (let i = 0; i < totalRegistros; i++) {
      if (detalleJson[i].Estado === 'Asigna') {
        asignaCount++;
      }
    }

    console.log(totalRegistros);
    console.log(asignaCount);

    return detalleJson && formatos[key].estado === 'Asigna' && asignaCount > 0;
  });

  const filteredPlantilla = {};
  filteredOptions.forEach((key) => {
    filteredPlantilla[key] = formatos[key];
  });

  return filteredPlantilla;
};

const plantillaFiltrada = filtrarPlantilla(formatos);
console.log(plantillaFiltrada);



 
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