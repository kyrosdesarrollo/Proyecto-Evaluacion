import React ,{ useState, useRef, useEffect }from 'react'
import { useDispatch } from 'react-redux';

import * as XLSX from 'xlsx';
import DataTable from './CargaListDetalleTableNew';

import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { startNewExcel } from '../../../store/excel';

import CargaAlert from './CargaAlert';
import * as VariableGlobal from '../../../global'

import { EjemploExcelBosstrapView } from './EjemploExcelBosstrapView';
import { ErrorAlert } from './ErrorAlert';
import Swal from 'sweetalert2'




const CargaListToolbar = (props) => {

  const [open, setOpen] = React.useState(false);
  const [lista, setLista] = useState([]);
  const [habilitaTabla, setHabilitaTabla] = useState(true);
  const [formato, setFormato] = useState();
  const [botonImport, setBotonimport] = useState(true);
  const [cargaExcel, setCargaExcel] = useState(true);
  const [selectCombo, setSelectCombo] = useState();


  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [columns, setColumns] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetData, setSheetData] = useState({});
  const fileRef = useRef();

  const options = ['PARLO 1 LINEA', 'PARLO FRAUDE','PARLO FRAUDE MONITOREO','PARLO EQUIPO ESP.','PARLO FIDELIZACION','PARLO VENTAS'];


  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleChange = (event) => {    
    
    setHabilitaTabla(true);
    setCargaExcel(true);
    if (event.target.id === '') { setBotonimport (false); console.log('Nada ' + selectCombo) }

    if (event.target.id != 'combo-box-demo') { setBotonimport (false) ;}


    setSelectCombo (event.target.id );
    //  else { 
    //   console.log(event.target.id + 'Aqui')
    //   setBotonimport (true);}
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
        const data1 = XLSX.utils.sheet_to_json(ws,{header:1});


        VariableGlobal.ListaHeaders.FileReader = data1[0];
        //Considerar Encabezado
        // const headers = data1[0];
        // console.log('Inicio carga encabezado')
        // console.log(headers)
        // console.log('Fin carga encabezado')
        // //Considerar solo Data 0 eliminar y comenzar en 1 información.
        // data1.splice(0,1);

        // console.log('Solo Data 833')
        // console.log(data1);
        // console.log('Solo Data1 833')
        // console.log(data);
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

  //Para validar archivo
  const acceptaExtension = ["xlsx","xls"];
  const checkArchivo = (name) =>{
      return acceptaExtension.includes(name.split(".").pop().toLowerCase());
  }

  const readDataFromExcel = (data) =>{

      const wb = XLSX.read(data);
      setSheetNames(wb.SheetNames);

      var mySheetData = {};

      //Recorre la hoja
     for (let i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];

      const worksheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet,
          {blankrows:"",
          header:1,
      });

      mySheetData[sheetName] = jsonData; 
      console.log(sheetName);
     }

     setSheetData(mySheetData);
     console.log(mySheetData);

      //Asignación de objeto a la hoja
      console.log(wb);

      return mySheetData;
  }

  const handleFile = async (e) => {
    if (selectCombo === ''){  
      Swal.fire({
        confirmButtonColor: '#2196f3',
        icon: 'error',
        title: 'Formato de archivo',
        text: 'Favor de seleccionar formato para agregar archivo Excel, recordar que extensión soportada XLSX y XLS',
      })
       return }
    const myFile = e.target.files[0];
    if (!myFile) { return; }
        if(!checkArchivo(myFile.name)){ 
              Swal.fire({
                confirmButtonColor: '#2196f3',
                icon: 'error',
                title: 'Archivo de carga',
                text: 'Favor de ingresar extensión correcta, recordar que extensión soportada XLSX y XLS',
              })
            setFile(null);
            setfileName(null);
            //fileRef.current.value = "";
            return;
        }

        setFile(myFile)
        //Lectura de archivo MetaData
        const data = await myFile.arrayBuffer();
        //Ejemplo de lectura completa
        const mySheetData = readDataFromExcel(data);
       

        //Selección o asignación  de hoja
        setFile(myFile)
        setfileName(myFile.name);

        props.onFileSubir(mySheetData);
    
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
                            accept='xlsx,xls'
                            multiple={false}
                            onChange={(e)=> handleFile(e)}
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
          // ? <DataTable lista = {lista}/>
          ? <EjemploExcelBosstrapView />
          : <Typography></Typography>

     }
     {
        (!!!cargaExcel)
        ? <CargaAlert /> 
        : <Typography></Typography>
     }

     <EjemploExcelBosstrapView />
    </>
  )
}

export default CargaListToolbar
