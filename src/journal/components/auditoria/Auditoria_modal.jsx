import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Card } from 'reactstrap';
import Auditoria_Preguntas from './Auditoria_Preguntas';

const ModalComponent = ({ open, onClose, rowData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      
      <DialogTitle>Autidoria</DialogTitle>
      <DialogContent>
        <p>Nombre: {rowData?.nombre}</p>
        <Auditoria_Preguntas/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
     
    </Dialog>
  )
}


export default ModalComponent;