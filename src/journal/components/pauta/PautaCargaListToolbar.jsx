import React from 'react'
import  { useState } from 'react'; 
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'

const PautaCargaListToolbar = () => {
  
  const [formato, setFormato] = useState();
  const [botonImport, setBotonimport] = useState(true);

  const options = ['PARLO', 'VOZ', 'OTRO'];
  const handleChange = (event) => {
    console.log(event.target.id);
     if (event.target.id != 'combo-box-demo') {
      setBotonimport (false) ;
     }
     else { setBotonimport (true)}
     
   
  };


  return (
        <>
            <Box>
              <Typography variant="h4" component="h2">
              Seleccion de Pauta 
              </Typography>;
            </Box>

            <Grid container spacing= { 0 } sx= {{ mb:2 , mt: 2}}>
              <Grid item 
                      xs={12} sx= {{ mt:2 }}>
                                  <Autocomplete
                                      disablePortal
                                      id="combo-box-demo"
                                      value= { formato }
                                      options={options}
                                      sx={{ width: 300 }}
                                      renderInput={(params) => <TextField {...params} label="Formato" />}
                                      onChange= { handleChange }
                                    
                                    />
                </Grid>
              
              </Grid>

            
    </>
  )
}

export default PautaCargaListToolbar
