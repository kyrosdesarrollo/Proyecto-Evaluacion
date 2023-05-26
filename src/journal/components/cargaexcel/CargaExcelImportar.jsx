import React, {useState, useRef} from 'react';
import { Label } from 'reactstrap';
import * as XLSX from 'xlsx';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useSelector,useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Button, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, DialogContentText, Modal, Typography,Icon } from '@mui/material';
import { startLoadingFormatos, startNewExcelFormato } from '../../../store/formato';


export const CargaExcelImportar = (props) => {
    //Estados para controlar archivo
    const [file, setFile] = useState(null);
    const [filename, setfileName] = useState(null);
    const [formato, setFormato] = useState();
    const [campanaTipo, setCampanaTipo] = useState();
    const [selectCombo, setSelectCombo] = useState('');
    const [selectComboName, setSelectComboName] = useState('');
    const [selectComboCampania, setSelectComboCampania] = useState('');
    const [selectComboNameCampania, setSelectComboNameCampania] = useState('');
    const [open, setOpen] = React.useState(false);
    const [botonImport, setBotonImport] = useState(true);
    const [habilitaTabla, setHabilitaTabla] = useState(true);
    const [lista, setLista] = useState([]);
    const [listaJson, setListaJson] = useState([]);
    const [showError, setShowError] = useState(false);
    const [showErrorMonitor, setShowErrorMonitor] = useState(false);
    //Estado para control de hoja
    const [sheetNames, setSheetNames] = useState([]);
   
    const [sheetData, setSheetData] = useState({});
    const fileRef = useRef();
    const dispatch = useDispatch();

    const options = ['PARLO 1 LINEA', 'PARLO FRAUDE','PARLO FRAUDE1','PARLO FRAUDE MONITOREO','PARLO EQUIPO ESP.','PARLO FIDELIZACION','PARLO VENTAS'];
    const campana = ['FALABELLA', 'RIPLEY','CRM','SODIMAC'];
    //Extraer Nombres de funcionarios  tipo = 1 = Monitor
    //Posible problema al incorporar otro dato en maestros, debdio a que numero será distinto ***** verificar en redux
    const funcionariosRedux = useSelector(state => state.funcionario.funcionario[1].funcionarios);
    const nombresFuncionariosMonitor = funcionariosRedux.reduce((nombres, funcionario) => {
        if (funcionario.Tipo === '1') {
          nombres.push(funcionario.Nombre);
        }
        return nombres;
      }, []);
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
    
    if (selectCombo === '' || selectComboCampania === ''){  
        Swal.fire({
          confirmButtonColor: '#2196f3',
          icon: 'error',
          title: 'Formato | Campañia  | Extensión archivo',
          text: 'Favor de seleccionar Formato y Campañia para poder agregar archivo Excel, recordar que extensión soportada XLSX y XLS. ',
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
const handleChangeCampana = (event) => {    
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
  setSelectComboNameCampania(event.target.innerText);
  setSelectComboCampania (event.target.id );
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
  if (selectCombo === '' || selectComboCampania === ''){  
    Swal.fire({
      confirmButtonColor: '#2196f3',
      icon: 'error',
      title: 'Formato | Campañia ',
      text: 'Favor de seleccionar Formato o Campañia para poder guardar archivo Excel, recordar que extensión soportada XLSX y XLS. ',
    });
     return}
   //Controla campo Monitor dentro del archivo
    if (!lista[0].includes('Monitor')) {
        setShowErrorMonitor(true);
        return
    }
    //Control de Monitor dentro del archivo
    for (let i = 0; i < listaJson.length; i++) {
        if (!nombresFuncionariosMonitor.includes(listaJson[i].Monitor)) {
            // El valor no está presente en nombresFuncionariosTipo1
            setShowError(true);
           return
          }
      }
    
    handleClose();
    setBotonImport (false) ;
    dispatch(startNewExcelFormato(lista, listaJson ,selectComboName, selectComboNameCampania));
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
              xs={12} sm={6} md={4} >
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo1"
                              value= { campanaTipo }
                              options={campana}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="** Campaña **" />}
                              onChange= { handleChangeCampana }
                             
                            />
        </Grid>
    
   
    
        
        <Grid item 
             xs={12}  sm={12} md={12}>
            <div className="mb-2">
                {filename && <Label>Archivo Excel descargado { filename }</Label>}
                {!filename && <Label>Adjuntar archivo Excel con Formato :   { selectComboName }  |  Campañia :   { selectComboNameCampania }</Label>}
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
        

    <Modal open={showError} onClose={() => setShowError(false)}>
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          
          <Typography variant="h6" gutterBottom>
            <Icon color="white">error</Icon> No se puede guardar archivo de formato.
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que No se encuentra Monitor, favor chequear e incorporar . 👻
        </Typography>
          <Button onClick={() => setShowError(false)}>Cerrar</Button>
        </div>
      </Modal>
      <Modal open={showErrorMonitor} onClose={() => setShowErrorMonitor(false)}>
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          
          <Typography variant="h6" gutterBottom>
            <Icon color="white">error</Icon> No se puede guardar archivo de formato.
         </Typography>
        <Typography variant="body1" gutterBottom>
           Debido a que No se encuentra el campo Monitor dentro del archivo, favor chequear e incorporar . 👻
        </Typography>
          <Button onClick={() => setShowErrorMonitor(false)}>Cerrar</Button>
        </div>
      </Modal>
    </>
  )
}
