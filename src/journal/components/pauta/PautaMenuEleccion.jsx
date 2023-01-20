import React from 'react'
import  { useState, useEffect } from 'react'; 
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { startNewMenu } from '../../../store/menu/thunks';
import { PautaDespliegaMenu } from './PautaDespliegaMenu';

 const PautaMenuEleccion = () => {

  const [formato, setFormato]             = useState();
  const [seleccionMenu, setSeleccionMenu] = useState();
  const [botonImport, setBotonImport]     = useState(true);
  const [open, setOpen]                   = useState(false);


  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceptar = () => {
    setOpen(false);
    dispatch(startNewMenu( seleccionMenu ))
    //dispatch(startLogout());
  };

  const { displayName } = useSelector(state=> state.auth);

  useEffect(() => {
    if (!seleccionMenu){ setBotonImport (true) ;}
  }, [seleccionMenu])

  

  const options = ['PARLO', 'VOZ'];

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
       Selección Pauta 
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
                            
        </Grid>
        </Grid> 
        <Grid item 
              xs={6} 
              sx= {{ mt:0 }}>
                          <PautaDespliegaMenu menu = { seleccionMenu } />
        </Grid>
    </>
  )
}
export default PautaMenuEleccion