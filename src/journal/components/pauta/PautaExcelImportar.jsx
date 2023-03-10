import React, {useState, useRef} from 'react';
import { Label } from 'reactstrap';
import * as XLSX from 'xlsx';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Button, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, DialogContentText } from '@mui/material';

import { pautaStartNewExcel } from '../../../store/Pauta';

export  const PautaExcelImportar = (props) => {
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
    //Estado para control de hoja
    const [sheetNames, setSheetNames] = useState([]);
    /* 
        {
            "sheet1":{},
            "sheet2":{}
        }
    */
    const [sheetData, setSheetData] = useState({});
    const fileRef = useRef();
    const dispatch = useDispatch();

    const options = ['PARLO 1 LINEA', 'PARLO FRAUDE','PARLO FRAUDE MONITOREO','PARLO EQUIPO ESP.','PARLO FIDELIZACION','PARLO VENTAS'];

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
        let jsonData = ''
        //Recorre la hoja
       for (let i = 0; i < wb.SheetNames.length; i++) {
        let sheetName = wb.SheetNames[i];

        const worksheet = wb.Sheets[sheetName];
         jsonData = XLSX.utils.sheet_to_json(worksheet,
            {blankrows:"",
            header:1,
        });
       
        mySheetData[sheetName] = jsonData; 
        i = wb.SheetNames.length;
       
       }
       setSheetData(mySheetData);
       
        //Asignaci??n de objeto a lista 
        setLista(jsonData);
        
        return mySheetData;
}
const handleFile = async (e) => {
    
    if (selectCombo === ''){  
        Swal.fire({
          confirmButtonColor: '#2196f3',
          icon: 'error',
          title: 'Formato de archivo',
          text: 'Favor de seleccionar formato para agregar archivo Excel, recordar que extensi??n soportada XLSX y XLS. ',
        });
         return}
    const myFile = e.target.files[0];
    if (!myFile) { return; }

        if(!checkArchivo(myFile.name)){ 
            Swal.fire({
                confirmButtonColor: '#2196f3',
                icon: 'error',
                title: 'Archivo de carga',
                text: 'Favor de seleccionar el archivo con extensi??n correcta, recordar que extensi??n soportada XLSX y XLS. ',
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
       

        //Selecci??n o asignaci??n  de hoja
        setFile(myFile)
        setfileName(myFile.name);

        props.onFileSubir(mySheetData);
    
};
const handleRemove = () => {
    setFile(null);
    setfileName(null);
    setSheetNames([]);
    setSheetData(null);

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
    handleClose();
    setBotonImport (false) ;
    dispatch(pautaStartNewExcel(lista, selectComboName));
    console.log('paso por PautastartNewExcel')
    //Hacer

    setFile(null);
    setfileName(null);
    setSheetNames([]);
    setSheetData(null);
    props.onFileSubir(null);
    fileRef.current.value = "";

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Archivo Pauta importado con ??xito.',
        showConfirmButton: false,
        timer: 1500
      })





};
  return (
    <>
     <Grid container spacing= { 2 } >
       <Grid item 
              xs={12} sx= {12} sm={6} md={4} >
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
    
   
    
        
        <Grid item 
             xs={12} sx= {12} sm={12} md={12}>
            <div className="mb-2">
                {filename && <Label>Archivo Excel descargado { filename }</Label>}
                {!filename && <Label>Adjuntar archivo Excel con formato { selectComboName } ...</Label>}
            </div>
        </Grid>
        <Grid item 
             xs={12} sx= {12} sm={6} md={4}>
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
        
                {/* <input 
                    type="file"
                    accept='xlsx,xls'
                    multiple={false}
                    onChange={ (e) => handleFile(e)}
                    ref = {fileRef}
                /> */}
        {filename &&(
                    <>
                   
                   <Grid item 
                        xs={8} sx= {8} sm={8} md={4}>
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
                        xs={8} sx= {8} sm={8} md={4}>
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
                                                {" ?? Estas seguro de guardar los datos informados desde archivo Excel ? "}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                De igual forma podr??s modificar esta informaci??n.
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

export default PautaExcelImportar