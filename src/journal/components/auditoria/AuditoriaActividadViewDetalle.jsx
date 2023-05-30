import React, {useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import AuditoriaVisualFormato from './visual_formato/AuditoriaVisualFormato';
import {startUpdateFormato } from '../../../store/formato/thunks';

const AuditoriaActividadViewDetalle = (props) => {
    const [open, setOpen] = React.useState(false);
    const { formatos } = useSelector(state => state.formato);

    // useSate donde devuelve la información obtenida del componete VisualFormnato.jsx
    const [selectRowValue, setSelectRowValue] = useState(null);
    function updateSelectRowValue(value) {
      setSelectRowValue(value);
    }

    const dispatch = useDispatch();
    //Tomando los formatos
    const formatosReduxRespuesta = useSelector(state => state.formato.formatos);

    var j = Number(props.id);
    // //Busqueda de indice en redux
    const indice = formatos.findIndex((item) => item.numeroCorrelativo === j);
    //Cambio a Indice
    j=indice;

    const plantilla = Object.assign({},formatos[j]);
    let pauta = JSON.stringify(formatos[j].formato)
    
   const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };

  //Guardar las encuestas completas
  const onGuardar = () =>{

     // //Busqueda de indice en redux
    //  const indice = formatos.findIndex((item) => item.numeroCorrelativo === j);
    //  //Cambio a Indice
    //  j=indice;
     console.log(j)
     console.log(formatosReduxRespuesta[j])
    //Extración id = numero de archivo
    const id = formatosReduxRespuesta[j].id ;
   // console.log(formatosReduxRespuesta[j])
    //Extrae el detalleJson, los registros que contengan información respuestas
    console.log(id)
    const detalleJson = formatosReduxRespuesta[j].detalleJson;


    console.log(detalleJson)
     //Aqui recibie los registros seleccionado por usuario
     let registrosAsignados = selectRowValue;

     if (registrosAsignados.length < 1) {
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
 
    //Filtrar los registros
    const elementosFiltrados = detalleJson.filter(elemento => {
      return elemento.Estado === "Asigna";
    });

    const objetosConRespuestas = [];
    detalleJson.forEach(objeto => {
      if (objeto.respuestas) {
        // Aquí procesas solo los objetos que tienen la propiedad "respuestas"
        objetosConRespuestas.push(objeto);
      }
    });

    //Validación si existe encuestas
    if (objetosConRespuestas.length<1) {
      handleClose(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No hay encuestas realizadas.',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    //Filtrar los registros solo con estado Asigna para extracción de Ids, se incorpora -1 para registro
    const filtrarRegistros = (objetos) => {
      const registrosFiltrados = objetos.filter((objeto) => objeto.Estado === 'Asigna');
      const idsAsignados = registrosFiltrados.map((objeto) => objeto.id -1);
      return idsAsignados;
    };
    
    const idsAsignados = filtrarRegistros(objetosConRespuestas);
    //Recorre el arreglo completo y cambia el estado Asigna a los registros seleccionados
    const ArregloAsignados = detalleJson.map((obj, index) => {
      return idsAsignados.includes(index) ? {...obj, Estado: "Cierre"} : {...obj};
    });

     //Actualización en Firebase todos los registros + ID de documento



     
     
    dispatch(startUpdateFormato(ArregloAsignados,id));
    
    handleClose(false);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Evaluación realizada con éxito.',
      showConfirmButton: false,
      timer: 1500
    });

    //Dejar de modo inicial ventana con información null
    props.onBorrarInformacion();
    setOpen(false);
  }
  return (
    <>
     <Stack spacing={2} direction="row">
       <Button 
         variant="contained"
         onClick={handleClickOpen}
             >Guardar Encuesta 📈
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
      <AuditoriaVisualFormato 
        id = {j}  
        nombrePauta = {pauta}
        updateSelectRowValue={updateSelectRowValue}
        />  
    </>
  )
}
export default AuditoriaActividadViewDetalle
