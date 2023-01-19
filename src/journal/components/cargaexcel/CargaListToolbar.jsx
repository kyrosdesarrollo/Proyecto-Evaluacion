import React from 'react'
import  { useState } from 'react'; 
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'

import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CargaListToolbar = () => {
  const [lista, setLista] = useState([]);
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

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

  
      fileReader.onload = (e) => {

        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        console.log(wb)
        const wsname = wb.SheetNames[0];
        console.log(wsname);
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        // VALIDACION
        // const jDatos = [];
        // for(let i = 0; i < data.length; i++){
        //   const dato = data[i];
        //   jDatos.push({
        //     ...dato,
        //     NOMBRE: 'NELSON'
           
        //   });
        // }
    
        // console.log(jDatos);
        resolve(data);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  
    promise.then((d) => {
      setLista(d);
      console.log(lista);
    });
  };
  // ********* Excel JSON ********

  return (
<>
    <Box>
      <Typography variant="h4" component="h2">
       Cargar archivo en formato Excel
      </Typography>
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
        <Grid item 
              xs={2} sx= {{ mt:2 }}>
                          <Button
                          disabled={botonImport}
                          variant="contained"
                          component="label"
                          startIcon={(<CloudUploadIcon fontSize="small" />)}
                          sx={{ width: 150 }}>

                        Importar
                        <input
          
                            hidden
                            type="file"
                            onChange={(e) => {
                              
                              const file = e.target.files[0];
                              readExcel(file);
                            }}
        />
                        </Button>
        </Grid>
      </Grid>

     
    </>
  )
}

export default CargaListToolbar
