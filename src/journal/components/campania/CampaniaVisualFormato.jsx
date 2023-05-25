import { TextField, Button, Box, Typography, Divider, Grid,Modal } from '@mui/material';
import React, { useState } from 'react';
import { startNewCampania } from '../../../store/campania/thunks';
import { useDispatch } from 'react-redux';
import CampaniaCrud from './CampaniaCrud';
import VisualizarCampania from './VisualizarCampania';

const CampaniaVisualFormato = () => {
  const [nombreCampania, setNombreCampania] = useState('');
  const [qSemana, setQSemana] = useState('');
  const [qMensual, setQMensual] = useState('');
  const [showTabla, setShowTabla] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes utilizar los datos guardados en los estados
    // para enviarlos a la base de datos o hacer lo que necesites
    dispatch(startNewCampania(nombreCampania, qSemana, qMensual));
    setNombreCampania('');
    setQSemana('');
    setQMensual('');
  };

  const handleVerCampañas = () => {
    setShowTabla(true);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
          fontWeight: 'bold'
        }}
      >
        <Typography variant="h5" component="h2" textAlign="center" mb={2}>
          REGISTRO DE CAMPAÑA
        </Typography>
        <Divider sx={{ width: '100%', mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre Campaña"
            variant="outlined"
            value={nombreCampania}
            onChange={(event) => setNombreCampania(event.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Cantidad Semanal"
            variant="outlined"
            value={qSemana}
            onChange={(event) => setQSemana(event.target.value)}
            margin="normal"
            type="number"
            fullWidth
            required
          />
          <TextField
            label="Cantidad Mensual"
            variant="outlined"
            value={qMensual}
            onChange={(event) => setQMensual(event.target.value)}
            margin="normal"
            type="number"
            fullWidth
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', width: '100%' }}>
            <Button type="submit" variant="contained" color="primary" aria-label="Registrar campaña">
              Registrar Campaña
            </Button>
            <Grid>{showTabla && <CampaniaCrud />}</Grid>
          </Box>
        </form>
         </Box>
         <br></br>
         <br></br>
         <Box display="flex" justifyContent="center" >
      <VisualizarCampania />
      </Box>
      
      </>
    );
};

export default CampaniaVisualFormato;
