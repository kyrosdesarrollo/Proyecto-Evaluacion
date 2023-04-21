import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import AuditoriaVisualFormato from './visual_formato/AuditoriaVisualFormato';
import { startUpdateFormatoRespuesta } from '../../../store/formato/thunks';

const AuditoriaActividadViewDetalle = (props) => {
    const [open, setOpen] = React.useState(false);
    const { formatos } = useSelector(state => state.formato);

    const dispatch = useDispatch();
    //Tomando los formatos
    const formatosReduxRespuesta = useSelector(state => state.formato.formatos);

    var j = Number(props.id);

    const plantilla = Object.assign({},formatos[j]);
    let pauta = JSON.stringify(formatos[j].formato)
    
   const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };
  const onGuardar = () =>{
    const id = formatosReduxRespuesta[j].id ;

   // console.log(formatosReduxRespuesta[j])
    //Extrae el detalleJson, los registros que contengan información respuestas
    const detalleJson = formatosReduxRespuesta[j].detalleJson;
   // console.log(detalleJson)

    const objetosConRespuestas = [];
    detalleJson.forEach(objeto => {
      if (objeto.respuestas) {
        // Aquí procesas solo los objetos que tienen la propiedad "respuestas"
        objetosConRespuestas.push(objeto);
      }
    });

    const respuestas = objetosConRespuestas.map(objeto => objeto.respuestas);
    //Actualización en Firebase registros + ID de documento
    dispatch(startUpdateFormatoRespuesta(id,respuestas, "Evaluación"));
    handleClose(false);
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Asignación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    })
    setOpen(false);
  }
  return (
    <>
     <Stack spacing={2} direction="row">
       <Button 
         variant="contained"
         onClick={handleClickOpen}
             >Guardar
       </Button>
       <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de guardar Evaluación ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de guardar evaluación ,se activará la notificacion y él encargado podrá visualizar esta información .
                                                Nota Importante: No se podrá volver atrás.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={onGuardar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>

   </Stack>
    <br></br>
      <Grid container spacing={1}>
      </Grid>
      <AuditoriaVisualFormato id = {j}  nombrePauta = {pauta}/>  
    </>
  )
}
export default AuditoriaActividadViewDetalle
