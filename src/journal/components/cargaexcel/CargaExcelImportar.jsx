import React, {useState, useRef} from 'react';
import { Label } from 'reactstrap';
import * as XLSX from 'xlsx';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Button, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, DialogContentText } from '@mui/material';
import { startLoadingFormatos, startNewExcelFormato } from '../../../store/formato';

export const CargaExcelImportar = (props) => {
    //Estados para controlar archivo
    const [file, setFile] = useState(null);
    const [filename, setfileName] = useState(null);
    const [formato, setFormato] = useState();
    const [selectCombo, setSelectCombo] = useState('');
    const [selectComboName, setSelectComboName] = useState('');
    const [open, setOpen] = React.useState(false);
    const [botonImport, setBotonImport] = useState(true);
    const [habilitaTabla, setHabilitaTabla] = useState(true);
    const [lista, setLista] = useState([]);
    const [listaJson, setListaJson] = useState([]);
    //Estado para control de hoja
    const [sheetNames, setSheetNames] = useState([]);
   
    const [sheetData, setSheetData] = useState({});
    const fileRef = useRef();
    const dispatch = useDispatch();

    const options = ['PARLO 1 LINEA', 'PARLO FRAUDE','PARLO FRAUDE1','PARLO FRAUDE MONITOREO','PARLO EQUIPO ESP.','PARLO FIDELIZACION','PARLO VENTAS'];

    //Para validar archivo
    const acceptaExtension = ["xlsx","xls"];
const checkArchivo = (name) =>{
        return acceptaExtension.includes(name.split(".").pop().toLowerCase());
}
const readDataFromExcel = (data) =>{
        const wb = XLSX.read(data);
        //Deje solo la primera hoja [0]
        setSheetNames(wb.SheetNames[0]);
       
        var mySheetData = {};
        let jsonData = '',jsonData1 = '';
        //Recorre la hoja
       for (let i = 0; i < wb.SheetNames.length; i++) {
                let sheetName = wb.SheetNames[i];

                const worksheet = wb.Sheets[sheetName];
        
                jsonData = XLSX.utils.sheet_to_json(worksheet,
                    {blankrows:"",
                    header:1,
                });
                jsonData1 = XLSX.utils.sheet_to_json(worksheet);
            
                mySheetData[sheetName] = jsonData; 
                i = wb.SheetNames.length;
       
       }
        
        setSheetData(mySheetData);
        //Agrega datos a nivel de linea para controlar el proceso
        jsonData1.forEach((node) => node.Estado = "Carga" );
         //REALIZAR MEJORA CONSIDERANOD SOLO 1 
        setLista(jsonData);
        setListaJson(jsonData1);
        //Variable Global, la utilizo en el componente VisualFormato para saber el detalle JSON
        window.myGlobalVariable =jsonData1;
        
        return mySheetData;
}
const handleFile = async (e) => {
    
    if (selectCombo === ''){  
        Swal.fire({
          confirmButtonColor: '#2196f3',
          icon: 'error',
          title: 'Formato de archivo',
          text: 'Favor de seleccionar formato para agregar archivo Excel, recordar que extensión soportada XLSX y XLS. ',
        });
         return}
    const myFile = e.target.files[0];
    if (!myFile) { return; }

        if(!checkArchivo(myFile.name)){ 
            Swal.fire({
                confirmButtonColor: '#2196f3',
                icon: 'error',
                title: 'Archivo de carga',
                text: 'Favor de seleccionar el archivo con extensión correcta, recordar que extensión soportada XLSX y XLS. ',
              })
           
        setFile(null);
        setfileName(null);
        fileRef.current.value = "";
        return;}
        setFile(myFile)
        //Lectura de archivo MetaData
        const data = await myFile.arrayBuffer();
        //Ejemplo de lectura completa
        const mySheetData = readDataFromExcel(data);
       

        //Selección o asignación  de hoja
        setFile(myFile)
        setfileName(myFile.name);

        props.onFileSubir(mySheetData);
    
};
const handleRemove = () => {
    setFile(null);
    setfileName(null);
    setSheetNames([]);
    setSheetData(null);
    setLista([]);
    setListaJson([]);
    props.onFileSubir(null);

    fileRef.current.value = "";
 
};
const handleChange = (event) => {    
    setHabilitaTabla(true);
    if(event.target.id === ''){
        setBotonImport(true);
        setFile(null);
        setfileName(null);
        setSheetNames([]);
        setSheetData(null);
        setLista([]);
        setListaJson([]);
        props.onFileSubir(null);
        fileRef.current.value = "";}
   // if (event.target.id != 'combo-box-demo') { setSelectCombo (true); }
   
    setBotonImport(false);
    setSelectComboName(event.target.innerText);
    setSelectCombo (event.target.id );
            //  else { 
            //   console.log(event.target.id + 'Aqui')
            //   setBotonimport (true);}
};
const handleClickOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};
const onGuardarExcel = () =>{
    console.log('Aqui comienza a guardar hay que extraer actualizacion')
    console.log(listaJson);

    for (let i = 0; i < listaJson.length; i++) {
        console.log(listaJson[i].Monitor)
        const monitorValue = listaJson[i].Monitor ? listaJson[i].Monitor.trim() : "";
        if (monitorValue === "") {
          alert("Se encuentra un dato con Monitor vacío en archivo favor revisar y corregir. [ Opción 1 ] : Monitor no esta creado en sistema [ Opción 2 ] : Completar Monitor en archivo Excel. Gracias 🤨 !! ", listaJson[i]);
          return
        //   Swal.fire({
        //     position: 'top-center',
        //     icon: 'error',
        //     title: 'Favor verificar 1.- Campo Monitor contenga información 2.- Crear Monitor Gracias !!!',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
          // aquí podrías hacer lo que necesites con el objeto encontrado
        }
      }
    // listaJson.forEach(item => {
    //     if (item.Monitor === "") {
    //       // aquí puedes agregar tu lógica de validación, como mostrar un mensaje de error
    //       Swal.fire({
    //         position: 'top-center',
    //         icon: 'error',
    //         title: 'Favor verificar 1.- Campo Monitor contenga información 2.- Crear Monitor Gracias !!!',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     }
    //   });
    return
    handleClose();
    setBotonImport (false) ;
    dispatch(startNewExcelFormato(lista, listaJson ,selectComboName));
    //Borrar Data de excel una vez que guarda 
    setFile(null);
    setfileName(null);
    setSheetNames([]);
    setSheetData(null);
    props.onFileSubir(null);
    setLista([]);
    setListaJson([]);
    fileRef.current.value = "";

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Archivo importado con éxito.',
        showConfirmButton: false,
        timer: 1500
      })

   dispatch(startLoadingFormatos());

};
  return (
    <>
     <Grid container spacing= { 2 } >
       <Grid item 
              xs={12} sm={6} md={4} >
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              value= { formato }
                              options={options}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="** Formato **" />}
                              onChange= { handleChange }
                             
                            />
        </Grid>
    
   
    
        
        <Grid item 
             xs={12}  sm={12} md={12}>
            <div className="mb-2">
                {filename && <Label>Archivo Excel descargado { filename }</Label>}
                {!filename && <Label>Adjuntar archivo Excel con formato { selectComboName } ...</Label>}
            </div>
        </Grid>
        <Grid item 
             xs={12} sm={6} md={4}>
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
                                        ref = {fileRef}
                    />
                                    </Button>
                    </Grid>
        {filename &&(
                    <>
                   
                   <Grid item 
                        xs={8}  sm={8} md={4}>
                                            <Button
                                                //disabled={habilitaTabla}
                                                color="error"
                                                variant="contained"
                                                component="label"
                                                startIcon={(<DeleteForeverRoundedIcon fontSize="small" />)}
                                                sx={{ width: 150 }}
                                                onClick={handleRemove}
                                            >

                                            Borrar
                                        
                                            </Button>
                                            
                                 </Grid>

                    <Grid item 
                        xs={8} sm={8} md={4}>
                                            <Button
                                                
                                                //disabled={habilitaTabla}
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
                                                {" ¿ Estas seguro de guardar los datos informados desde archivo Excel ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                De igual forma podrás modificar esta información antes de la confirmación de Asignación de actividad.
                                                Nota Importante: Los campos relevantes para realizar reporteria son los de cabecera.
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={onGuardarExcel} autoFocus>
                                                    Si
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
                                            
                                 </Grid>
                    
                   </>
                )}
               
       
       
               </Grid>
        
    </>
  )
}
