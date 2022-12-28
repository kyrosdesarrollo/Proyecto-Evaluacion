import React from 'react'
import  { useState, useEffect } from 'react'; 
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'

import * as XLSX from 'xlsx';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useSelector } from 'react-redux';
import { DespliegaMenu } from '../../components/menueleccion/DespliegaMenu';

 const MenuEleccion = () => {

  const [lista, setLista] = useState([]);
  const [formato, setFormato] = useState();
  const [seleccionMenu, setSeleccionMenu] = useState();


  const [botonImport, setBotonimport] = useState(true);

  const { displayName } = useSelector(state=> state.auth);

  useEffect(() => {
  }, [seleccionMenu])

  
  
  const options = ['ADMINISTRADOR', 'EJECUTIVO', 'MONITOR'];

  const handleChange = (event) => {

    
     if (event.target.id != 'combo-box-demo') {
      setBotonimport (false) ;
      setSeleccionMenu (event.target.innerText);
      
     }
     else { setBotonimport (true)}
     
   
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
                                    disabled={botonImport}
                                    variant="contained"
                                    component="label"
                                    startIcon={(<PersonAddAlt1Icon fontSize="small" />)}
                                    sx={{ width: 150 }}>

                                  Aceptar
                                
                                  </Button>
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