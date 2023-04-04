import React, {useMemo} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import Swal from 'sweetalert2'



import VisualFormato from './visual_formato/VisualFormato';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const AsignaciónActividadViewDetalle = ( props) => {
    const [open, setOpen] = React.useState(false);
    const [openEliminar, setOpenEliminar] = React.useState(false);

    const { formatos } = useSelector(state => state.formato);
    const dispatch = useDispatch();

    var j =Number(props.id);
  
    let registrosActualizado = [];

    const plantilla = Object.assign({},formatos[j]);
    
    const nombre = plantilla.nombre;
    const date = plantilla.date;
    const formato = plantilla.formato;
    const identifico = plantilla.id;
   
    const fechaString = useMemo(() => 
        {
                const newDate = new Date(date);
                return newDate.toLocaleString('en-CL');

        },[date]);


   const handleClickOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
      setOpen(false);
  };
  const handleClickOpenEliminar = () => {
    setOpenEliminar(true);
  };

const handleCloseEliminar = () => {
  setOpenEliminar(false);
};
const handleChange = (e) => {
  registrosActualizado = Object.assign(e);
};
  const onGuardar = () =>{
    //Actualización en Firebase registros + ID de documento
    dispatch(startUpdateFormato(registrosActualizado,identifico, "Asigna"));
    //Cierre de ventana emergente
    handleClose(false);
    //Ventana de actualización
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Asignación realizada con éxito.',
      showConfirmButton: false,
      timer: 1800
    })
    //Dejar de modo inicial ventana con información null
    props.onBorrarInformacion();
    setOpenEliminar(false);
    setOpen(false);
  }

  const onEliminar = () =>{
    handleCloseEliminar();
    dispatch(startDeleteFormato(identifico));
    dispatch(startLoadingFormatos());
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Eliminación realizada con éxito.',
      showConfirmButton: false,
      timer: 1900
    })
    props.onBorrarInformacion();
    setOpenEliminar(false);
    setOpen(false);
  }
  return (
    <>
     <Stack spacing={2} direction="row">
       
                                                <Button 
                                                  color="success"
                                                  variant="contained"
                                                  startIcon={(<ReduceCapacityIcon fontSize="small" />)}
                                                  onClick={handleClickOpen}
                                                      >Asignar a Monitores
                                                </Button>
                                                <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de asignar las actividades a los usuarios seleccionados  ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de Asignar las actividad,  a los usuarios se activarán las notificaciones y podrán visualizar su información en su perfil .
                                                Nota Importante: a.- Deben estar seleccionados los registros. b.- Los campos relevantes para realizar reporteria son los de cabecera.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={onGuardar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>


                                            <Button 
                                              variant="contained"
                                              color="error"
                                              startIcon={(<DeleteForeverRoundedIcon fontSize="small" />)}
                                              onClick={handleClickOpenEliminar}
                                                  >Eliminar archivo
                                            </Button>
                                            <Dialog
                                                open={openEliminar}
                                                onClose={handleCloseEliminar}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de eliminar el archivo ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de eliminar este archivo no habrá vuelta atrás , de igual modo deseas eliminar la información .
                                                Nota Importante: Los campos relevantes para realizar reporteria son los de cabecera.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleCloseEliminar}>No</Button>
                                                <Button onClick={onEliminar} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
      
   </Stack>
    <br></br>

      <VisualFormato 
          id = {j} 
          onActualizaInfo = {(e) => handleChange(e)}
      />

    </>
  )
}


export default AsignaciónActividadViewDetalle
