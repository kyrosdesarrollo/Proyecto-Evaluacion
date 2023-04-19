import React, {useMemo} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

import AuditoriaVisualFormato from './visual_formato/AuditoriaVisualFormato';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const AuditoriaActividadViewDetalle = (props) => {
    const [open, setOpen] = React.useState(false);
    const { formatos } = useSelector(state => state.formato);
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
     //Actualización en Firebase registros + ID de documento
     dispatch(startUpdateFormato(registrosActualizado,identifico, "Asigna"));
     
    handleClose(false);
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Asignación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    })
    setOpenEliminar(false);
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
                                                {" ¿ Estas seguro de asignar las actividades a los usuarios correspondientes ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de Asignar las actividad, a los usuarios se activarán las notificaciones o podrán visualizar su información .
                                                Nota Importante: Los campos relevantes para realizar reporteria son los de cabecera.
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
