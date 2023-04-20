import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import Auditoria_Preguntas from './Auditoria_Preguntas';

const ModalComponent = (props) => {
//1) Levanta ventana para que el usuario pueda contestar
//2) Para las preguntas conosidera dos parametros pauta y linea que se desea contestar las preguntas
const handleClose = () => {
  // Lógica para cerrar la ventana modal
  props.onClose();
}
  return (
    <Dialog open={props.open} onClose={props.onClose} sx={{ '& .MuiDialog-paper': { maxWidth: '900px' } }}>
      <DialogTitle align='center'>E V A L U A C I Ó N </DialogTitle>
      <DialogContent>
     <Box sx={{ marginBottom: '20px' }}>
      <p sx={{ fontSize: '16px' }}>Nombre: {props.rowData?.Ejecutivo}</p>
      {/* <p sx={{ fontSize: '16px' }}>Rut: {rowData?.Rut}</p>
      <p sx={{ fontSize: '16px' }}>Fecha: {rowData?.['Fecha de Auditoria']}</p> */}
    </Box>
        <Auditoria_Preguntas pautasSeleccion={props.pauta} lineaObjeto={props.rowData} formato ={props.formato} handleClose={handleClose}/>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalComponent;