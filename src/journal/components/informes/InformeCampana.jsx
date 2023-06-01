import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { InformeCampanaDetalle } from './InformeCampanaDetalle';

export const InformeCampana = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [controlInforme, setControlInforme] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleAccept = () => {
    if (!startDate || !endDate) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Favor de seleccionar fechas ¡Gracias! 😉',
        showConfirmButton: false,
        timer: 3000
      });
      setControlInforme(false);
    } else if (startDate > endDate) {
      setControlInforme(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La fecha de inicio debe ser superior o igual a la fecha de término.. ¡Gracias! 😉',
        showConfirmButton: false,
        timer: 3000
      })
      
    } else {
      setControlInforme(true);
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

        <Box mt={4} display={controlInforme ? 'block' : 'none'}>
          <InformeCampanaDetalle />
        </Box>
    </>
  );
};
