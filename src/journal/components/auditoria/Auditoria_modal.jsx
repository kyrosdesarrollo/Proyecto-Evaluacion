import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import Auditoria_Preguntas from './Auditoria_Preguntas';

const ModalComponent = ({ open, onClose, rowData,pauta }) => {
//1) Levanta ventana para que el usuario pueda contestar
//2) Para las preguntas conosidera dos parametros pauta y linea que se desea contestar las preguntas
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { maxWidth: '900px' } }}>
      <DialogTitle align='center'>A U D I T O R I A</DialogTitle>
      <DialogContent>
     <Box sx={{ marginBottom: '20px' }}>
      <p sx={{ fontSize: '16px' }}>Nombre: {rowData?.Ejecutivo}</p>
      <p sx={{ fontSize: '16px' }}>Rut: {rowData?.Rut}</p>
      <p sx={{ fontSize: '16px' }}>Fecha: {rowData?.['Fecha de Auditoria']}</p>
    </Box>
        <Auditoria_Preguntas pautasSeleccion={pauta} lineaObjeto={rowData}/>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalComponent;