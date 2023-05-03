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
import { startLoadingMenus, startNewMenu } from '../../../store/menu/thunks';
import { reload } from 'firebase/auth';
import { startLogout } from '../../../store/auth';
import { funcionarioStartNewRegister } from '../../../store/funcionario/thunks';


 const MenuEleccion = () => {

  const [formato, setFormato]             = useState();
  const [seleccionMenu, setSeleccionMenu] = useState();
  const [botonImport, setBotonImport]     = useState(true);
  const [open, setOpen]                   = useState(false);
  //Extrae los formatos desde Redu
const { displayName} = useSelector(state => state.auth)
  const dispatch = useDispatch();

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
    console.log(seleccionMenu)
    //Crear perfil de usuario en base a selección y datos de usuario
    dispatch(startNewMenu( seleccionMenu ))
   
    // let perfil = transformarCadena(seleccionMenu)
    // let funcionario = { Nombre: displayName, Correo: email, id: uid, Tipo : perfil , Activo: 1 };
    // console.log('Inicio Funcionario')
    // console.log(funcionario)
    dispatch(funcionarioStartNewRegister(transformarCadena(seleccionMenu)));
    // Recargar la página
  //window.location.reload();
    //dispatch(startLogout());
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