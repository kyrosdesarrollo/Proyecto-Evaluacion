import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import { InformeCampanaDetalle } from './InformeCampanaDetalle';
import { useSelector } from 'react-redux';
import { obtenerCampanaOptions } from '../../../utilities/utlidades';

export const InformeCampana = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [controlInforme, setControlInforme] = useState(false);
  const [controlClick, setControlClick] = useState(false);
  const [valueCampana, setValueCampana] = useState(null);
  const [inputValueCampana, setInputValueCampana] = useState('');
  const [nombreCampana, setNombreCampana] = useState('');

  const { campania } = useSelector(state => state.campania);
  //Funcion para obtener nombre de campañas ir a ruta Utilities
  const campanaOptions = obtenerCampanaOptions(campania);

  //Selección Campaña
  const onSeleccionCampaña = (e) => {
    setNombreCampana(e);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleAccept = () => {
    console.log(nombreCampana)
    console.log(startDate)
    console.log(endDate)
    setControlClick(false);
    let errorMessage;
    if (nombreCampana === "" || nombreCampana === null) {
      errorMessage = "Favor de seleccionar campaña ¡Gracias! 😉";
    } else if (!startDate || !endDate) {
      errorMessage = "Favor de seleccionar fechas ¡Gracias! 😉";
    } else if (startDate > endDate) {
      errorMessage = "La fecha de inicio debe ser superior o igual a la fecha de término.. ¡Gracias! 😉";
    } else {
      setControlInforme(true);
      setControlClick(true);
    }
    
    if (errorMessage) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 3000
      });
      setControlInforme(false);
      setControlClick(false);
    }
  };

  return (
    <>
     <br />
      <Box md={12}>
        <Typography variant="h4" component="h2">
          Informe por Campaña
        </Typography>
      </Box>
      <br />
        <Autocomplete
          value={valueCampana}
          onChange={(event, newValue) => {
            setValueCampana(newValue);
            onSeleccionCampaña(newValue);
          }}
          inputValue={inputValueCampana}
          onInputChange={(event, newInputValue) => {
            setInputValueCampana(newInputValue);
          }}
          id="controllable-states-demo1"
          options={campanaOptions}
          sx={{ width: 1200 }}
          renderInput={(params) => <TextField {...params} label="Selección de Campaña" />}
        />
        <br />
      <br />
  

      <Grid container spacing={12} alignItems="center">
        <Grid item xs={3}>
          <TextField
            id="dateInicio"
            label="Fecha de Inicio"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="dateFinal"
            label="Fecha de Termino"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Aceptar
          </Button>
        </Grid>
      </Grid>
     
      <br />

 { 
    controlClick &&
        <Box mt={4} display={controlInforme ? 'block' : 'none'}>
        <InformeCampanaDetalle 
          fechaInicio = {startDate}
          fechaTermino = { endDate }
          campana = {nombreCampana}
          controlBotonClick = { controlClick }
        />
        </Box>
 }
    </>
  );
};
