import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Auditoria_Preguntas from './Auditoria_Preguntas';


const ModalComponent = ({ open, onClose, rowData }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { maxWidth: '900px' } }}>
      
      <DialogTitle align='center'>A U D I T O R I A</DialogTitle>
      <DialogContent>
        <p>Nombre: {rowData?.nombre}</p>
        <Auditoria_Preguntas/>
      </DialogContent>
      <DialogActions>
      
        <Button variant="outlined" onClick={onClose}>Cerrar</Button>
        </DialogActions>
     
    </Dialog>
  )
}


export default ModalComponent;