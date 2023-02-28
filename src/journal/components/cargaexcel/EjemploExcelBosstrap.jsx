import React, {useState, useRef} from 'react';
import { Row, Col, Label } from 'reactstrap';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

export const EjemploExcelBosstrap = (props) => {
    //Estados para controlar archivo
    const [file, setFile] = useState(null);
    const [filename, setfileName] = useState(null);
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
    const myFile = e.target.files[0];
    if (!myFile) { return; }

        if(!checkArchivo(myFile.name)){ 
            alert("Archivo con extensión errónea");
            console.log('first');

            <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                        </Alert>
                </Stack>
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
    
}
const handleRemove = () => {
    setFile(null);
    setfileName(null);
    setSheetNames([]);
    setSheetData(null);

    props.onFileSubir(null);

    fileRef.current.value = "";
 
}
  return (
    <>
   
    <Row>
        <Col>
        <div className="mb-2">
            {filename && <Label>Archivo Excel descargado { filename }</Label>}
            {!filename && <Label>Descargar archivo Excel ...</Label>}
        </div>

        <div className=''>
                <input 
                    type="file"
                    accept='xlsx,xls'
                    multiple={false}
                    onChange={ (e) => handleFile(e)}
                    ref = {fileRef}
                />
                {filename &&(
                    <>
                    <div>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleRemove}>
                            Eliminar</Button>
                   </div>
                   </>
                )}
               
        </div>
        </Col>

    </Row>

        
    </>
  )
}
