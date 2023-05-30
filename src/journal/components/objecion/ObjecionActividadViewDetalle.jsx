import React, {useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

import { startUpdateFormatoObjecion } from '../../../store/formato';
import ObjecionVisualFormato from './visual_formato/ObjecionVisualFormato';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ObjecionActividadViewDetalle = ( props ) => {
      
    const [open, setOpen] = React.useState(false);
    const [openEliminar, setOpenEliminar] = React.useState(false);

    const { formatos } = useSelector(state => state.formato);
    const dispatch = useDispatch();
     //Tomando los formatos
     const formatosReduxRespuesta = useSelector(state => state.formato.formatos);

     // useSate donde devuelve la información obtenida del componete VisualFormnato.jsx
     const [selectRowValue, setSelectRowValue] = useState(null);
     function updateSelectRowValue(value) {
       setSelectRowValue(value);
     }
   
    var j =Number(props.id);
     // //Busqueda de indice en redux
     const indice = formatos.findIndex((item) => item.numeroCorrelativo === j);
     //Cambio a Indice
     j=indice;
    let registrosActualizado = [];
    const plantilla = Object.assign({},formatos[j]);
    let pauta = JSON.stringify(formatos[j].formato)
    const identifico = plantilla.id;

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
    //Aqui recibie los registros seleccionado por usuario
    let registrosAsignados = selectRowValue;
    
    if (registrosAsignados === null) {
      setOpen(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No hay registros seleccionados',
        showConfirmButton: false,
        timer: 1800
      })
      return
    }

    //Extración id = numero de archivo
    const id = formatosReduxRespuesta[j].id ;
    //Extrae el detalleJson, los registros que contengan información respuestas
    const detalleJson = formatosReduxRespuesta[j].detalleJson;
   
    //Filtrar los registros
    const idsAsignados = registrosAsignados.map((respuesta) => respuesta.id - 1);
    
    //Recorre el arreglo completo y cambia el estado Asigna a los registros seleccionados
    const ArregloAsignados = detalleJson.map((obj, index) => {
      return idsAsignados.includes(index) ? {...obj, Estado: "Finalizado"} : {...obj};
    });
    
    //Actualización en Firebase registros + ID de documento
    dispatch(startUpdateFormatoObjecion(ArregloAsignados,id));
    //Cierre de ventana emergente
    handleClose(false);
    //Ventana de actualización
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Objeción realizada con éxito.',
      showConfirmButton: false,
      timer: 1800
    })
    //Dejar de modo inicial ventana con información null
    props.onBorrarInformacion();
    setOpenEliminar(false);
    setOpen(false);
  }
 
  return (
    <>
     <Stack spacing={2} direction="row">
       <Button 
         variant="contained"
         onClick={handleClickOpen}
             >Actualiza Ojeción Encuesta 🔖
       </Button>
       <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {" ¿ Estas seguro de objetar Evaluación ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Al momento de cerrar ,finalizará el proceso .
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
      <ObjecionVisualFormato 
          id = {j} 
          nombrePauta = {pauta}
          onActualizaInfo = {(e) => handleChange(e)}
          updateSelectRowValue={updateSelectRowValue}
      />

    </>
  )
}

export default ObjecionActividadViewDetalle
