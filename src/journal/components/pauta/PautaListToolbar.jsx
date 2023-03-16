import React ,{ useState }from 'react'
import { useDispatch } from 'react-redux';

import * as XLSX from 'xlsx';
//import DataTable from './CargaListDetalleTableNew';

import {Box, Typography } from '@mui/material'

import { PautaExcelView } from './PautaExcelView';
import { pautaStartNewExcel } from '../../../store/Pauta';
import BuscarPauta from './BuscarPauta';





const PautaListToolbar = () => {

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
    dispatch(pautaStartNewExcel(lista));
    console.log('paso por PautastartNewExcel')
    //window.location.reload(false);
  
    
    // dispatch ( startGoogleSignIn() );
  }

  return (
<>
    <Box md={12}>
      <Typography variant="h4" component="h2">
       <br></br>Cargar archivo Pauta 
      </Typography>
      
          {/* <BuscarPauta/> */}
      
      <PautaExcelView />
    </Box>


    </>
  )
}

export default PautaListToolbar
