import React ,{ useState }from 'react'
import { useDispatch } from 'react-redux';

import * as XLSX from 'xlsx';
import DataTable from './CargaListDetalleTableNew';

import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { startNewExcel } from '../../../store/excel';

import CargaAlert from './CargaAlert';
import CargaListDetalleBasic from './CargaListDetalleBasic';
import AppMaterial from './CargaListDetalleTableMaterial';



const CargaListToolbar = () => {

  const [open, setOpen] = React.useState(false);
  const [lista, setLista] = useState([]);
  const [habilitaTabla, setHabilitaTabla] = useState(true);
  const [formato, setFormato] = useState();
  const [botonImport, setBotonimport] = useState(true);
  const [cargaExcel, setCargaExcel] = useState(true);
 

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = ['PARLO 1 LINEA', 'PARLO FRAUDE','PARLO FRAUDE MONITOREO','PARLO EQUIPO ESP.','PARLO FIDELIZACION','PARLO VENTAS'];

  const handleChange = (event) => {    
    
    setHabilitaTabla(true);
    setCargaExcel(true);

     if (event.target.id != 'combo-box-demo') {
      setBotonimport (false) ;
     }
     else { setBotonimport (true)}
  };

  const readExcel = (file) => {

    setHabilitaTabla(true);
    setCargaExcel(true);

    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        //const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wb = XLSX.read(bufferArray, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

       

        const data = XLSX.utils.sheet_to_json(ws);
        //const data = XLSX.utils.sheet_to_json(ws,{header:1});
        // //Considerar Encabezado
        // const headers = data[0];
        // console.log(headers)
        // //Considerar solo Data 0 eliminar y comenzar en 1 iinformación.
        // data.splice(0,1);
        // console.log(data);
        // return
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
      setHabilitaTabla(false)
      setLista(d);
    });
  };
  // ********* Excel JSON ********


  const onGuardarExcel = () =>{
    setHabilitaTabla(true);
    setBotonimport (false) ;
    setCargaExcel(false);
    handleClose()
    dispatch(startNewExcel(lista));
    console.log('paso por startNewExcel')
    //window.location.reload(false);
  
    
    // dispatch ( startGoogleSignIn() );
  }

  return (
<>
    <Box>
      <Typography variant="h4" component="h2">
       <br></br>Cargar archivo en formato Excel
      </Typography>
    </Box>

    <Grid container spacing= { 2 } sx= {{ mb:2 , mt: 2}}>
       <Grid item 
              xs={12} sx= {{ mt:2 }} >
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
              xs={6} sx= {{ mt:2 }} sm={4} md={3}>
                          <Button
                              disabled={botonImport}
                              variant="contained"
                              component="label"
                              startIcon={(<CloudUploadIcon fontSize="small" />)}
                              sx={{ width: 150 }}
                             
                          >

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
        <Grid item 
              xs={6} sx= {{ mt:2 }} sm={4} md={2}>
                          <Button
                              
                              disabled={habilitaTabla}
                              color="success"
                              variant="contained"
                              component="label"
                              startIcon={(<SaveAltIcon fontSize="small" />)}
                              sx={{ width: 150 }}
                              onClick={handleClickOpen}
                          >

                        Guardar
                       
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"¿ Desea guardar archivo Excel ?"}
                            </DialogTitle>
                            <DialogContent>
                              {/* <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This means sending anonymous
                                location data to Google, even when no apps are running.
                              </DialogContentText> */}
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button onClick={onGuardarExcel} autoFocus>
                                Si
                              </Button>
                            </DialogActions>
                          </Dialog>
                        
        </Grid>
       
      </Grid>
     {
      
        (!!!habilitaTabla)
          ? <DataTable lista = {lista}/>
          : <Typography></Typography>

     }
     {
        (!!!cargaExcel)
        ? <CargaAlert /> 
        : <Typography></Typography>
     }
     
    </>
  )
}

export default CargaListToolbar
