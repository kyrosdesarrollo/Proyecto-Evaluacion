import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';

export  const PautaExcelImportarVisual = (props) => {
    //Estados para controlar archivo
    const [formato, setFormato] = useState();
    
    const { pautas } = useSelector(state => state.pauta);
    console.log(pautas)
    let nuevoArreglo = []
    let  options = [];
   // Verificar si la propiedad formato existe y tiene elementos
        if (pautas) {
            const nuevoArreglo = [];
            for (let i = 0; i < pautas.length; i++) {
                nuevoArreglo.push(pautas[i].formato);
              }
              options = nuevoArreglo
        } else {
        console.log("No se encontraron pautas");
        }

    const handleChange = (event) => {  
        props.onFileSubirVisual(event.target.innerText)
    };
  
  return (
    <>
     <Grid container spacing= { 2 } >
       <Grid item 
              xs={12}  sm={6} md={4} >
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              value= { formato }
                              options={options}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="** Pauta **" />}
                              onChange= { handleChange }
                             
                            />
        </Grid>
    
   </Grid>

    </>
  )
}

export default PautaExcelImportarVisual