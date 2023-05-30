import React from 'react'
import  { useState, useEffect } from 'react'; 
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useDispatch, useSelector } from 'react-redux';
import { DespliegaMenu } from '../../components/menueleccion/DespliegaMenu';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import { startNewMenu } from '../../../store/menu/thunks';
import { startLoadingFuncionarios } from '../../../store/funcionario/thunks';



 const MenuEleccion = () => {

  const [formato, setFormato]             = useState();
  const [seleccionMenu, setSeleccionMenu] = useState();
  const [botonImport, setBotonImport]     = useState(true);
  const [open, setOpen]                   = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  //Extrae los formatos desde Redux
  const { displayName, email, uid} = useSelector(state => state.auth)
  //Extrae los formatos desde Redux
  const { funcionario } = useSelector(state => state.funcionario);
  

  const dispatch = useDispatch();
  //Se ejecuta solo una vez
  if (!isFetching) {
    dispatch(startLoadingFuncionarios());
    setIsFetching(true);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function transformarCadena(cadena) {
    switch (cadena) {
      case 'ADMINISTRADOR':
        return 3;
      case 'CALIDAD':
        return 2;
      case 'PLATAFORMA':
        return 4;
      case 'MONITOR':
        return 1;
      default:
        return cadena;
    }
  }
  
  const handleAceptar = () => {
    setOpen(false);
   
    let tipo = transformarCadena( seleccionMenu)
    //Crear perfil de usuario en base a selección y datos de usuario

    
  let arregloFuncionarios;
  if (funcionario.length > 0) {
    console.log('Si hay funcionarios')
     arregloFuncionarios = funcionario[0].funcionarios.map((funcionario) => {
      return {
        Nombre: funcionario.Nombre,
        Correo: funcionario.Correo,
        Password: funcionario.Password,
        Tipo: funcionario.Tipo,
        Activo: funcionario.Activo,
        Uid : funcionario.Uid,
      };
    });
  }else{ //Esto sirve cuando no viene el indice 0
    arregloFuncionarios = funcionario.funcionarios.map((funcionario) => {
      return {
        Nombre: funcionario.Nombre,
        Correo: funcionario.Correo,
        Password: funcionario.Password,
        Tipo: funcionario.Tipo,
        Activo: funcionario.Activo,
        Uid : funcionario.Uid,
      };
    });
  }
  const nuevoUsuario = {
    Nombre: displayName,
    Correo: email,
    Password: "123456",
    Tipo: tipo.toString(),
    Activo: '1',
    Uid: uid,
  };
  // Busca si existe un usuario con el mismo correo electrónico
  const usuarioExistente = arregloFuncionarios.find((usuario) => usuario.Correo === nuevoUsuario.Correo || usuario.Nombre === nuevoUsuario.Nombre);


if (usuarioExistente) {
  // Muestra una alerta con SweetAlert si se encontró un usuario con el mismo correo electrónico
    Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Correo de usuario ${ displayName } ya se encuentra registrado.`,
          showConfirmButton: false,
          timer: 1800
        })
  return
} else {
  // Agrega el nuevo usuario al array si no se encontró un usuario con el mismo correo electrónico
  arregloFuncionarios.push(nuevoUsuario);
}
console.log(arregloFuncionarios);


    dispatch(startNewMenu( seleccionMenu, arregloFuncionarios ))

   // Lógica para guardar los datos
   Swal.fire({
    title: 'Guardando datos...',
    html: 'Espere un momento por favor, automáticamente se conectará con nuevo usuario',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  setTimeout(() => {
    window.location.reload();
  }, 10000);
   
  };

  useEffect(() => {
    if (!seleccionMenu){ setBotonImport (true) ;}
  }, [seleccionMenu])

  

  const options = ['ADMINISTRADOR', 'CALIDAD', 'MONITOR','PLATAFORMA'];

  const handleChange = (event) => {
      if(!event.target.id){
          setBotonImport (true);
          setSeleccionMenu ('-');
        } else {
          if (event.target.id != 'combo-box-demo') {
                setBotonImport (false) ;
                setSeleccionMenu (event.target.innerText);
            }
      } 
   
  };

  return (
<>
    <Box>
      <Typography variant="h4" component="h2">
       Selección de menu para usuario  { displayName } 
      </Typography>;
    </Box>
    {/* { !!isSaving 
      ?  <Button>Loading .........</Button>
      : 
 }   */}
    <Grid container spacing= { 2 } sx= {{ mb:2 , mt: 2}}>
      <Grid item 
             xs={6} 
             sx= {{ mt:2 }}>
                         <Autocomplete
                             disablePortal
                             id="combo-box-demo"
                             value= { formato }
                             options={options}
                             sx={{ width: 300 }}
                             renderInput={(params) => <TextField {...params} label="Escoger Menu" />}
                             onChange= { handleChange }
                            
                           />
                           <Grid item 
                                 xs={2} 
                                 sx= {{ mt:2 }}>
                                   <Button
                                   onClick={handleClickOpen}
                                   disabled={botonImport}
                                   variant="contained"
                                   component="label"
                                   startIcon={(<PersonAddAlt1Icon fontSize="small" />)}
                                   sx={{ width: 150 }}>

                                   Aceptar
                               
                                 </Button>
                                 <Dialog open={open} onClose={handleClose}>
                                     <DialogTitle>Aceptación  de perfil  </DialogTitle>
                                     <DialogContent>
                                       <DialogContentText>
                                         ¿ Estás seguro de agregar perfil seleccionado ?
                                       </DialogContentText>
                               
                                     </DialogContent>
                                     <DialogActions>
                                       <Button onClick={handleClose}>Cancelar</Button>
                                       <Button onClick={handleAceptar}>Aceptar</Button>
                                     </DialogActions>
                               </Dialog>
                             </Grid>
       </Grid>
       
       <Grid item 
             xs={6} 
             sx= {{ mt:0 }}>
                         <DespliegaMenu  menu = { seleccionMenu } />
       </Grid>   
     </Grid>
     
    </>
  )
}
export default MenuEleccion