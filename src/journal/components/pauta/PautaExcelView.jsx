import React, {useState} from 'react'
import {Card, Row, Col, CardBody} from 'reactstrap';
import { Typography, Box } from '@mui/material';

import PautaExcelImportar from './PautaExcelImportar';
import CargaVisualPauta from './VisualPauta';
import PautaExcelImportarVisual from './PautaExcelImportarVisual';
import VisualPautaVisual from './VisualPautaVisual';

export const PautaExcelView = (props) => {

    const [sheetData, setSheetData] = useState(null);
    const [sheet, setSheet] = useState(null);
    const [sheetNames, setSheetNames] = useState(null);
    const [sheetDataVisual, setSheetDataVisual] = useState(null);
   
const handleSheetChange = (e) =>{
    setSheet(e.target.value);
}

 const handleFileSubir = (e) =>{
    
    if (e) { 
        let sheetNames = Object.keys(e);
        setSheetNames(sheetNames);
        setSheet(sheetNames[0]);
    }else{ setSheetNames(null);}

    setSheetData(e);
 }

//Envia el nombre de la Pauta
 const handleFileSubirVisual = (e) =>{    
     setSheetDataVisual(e);
 }
  return (

    <>
    <div className='content'>
        <Row>
            <Col md={12}>
            <div className="container">
            <div className="row">
                <div className="col-sm">
                <Box md={12}>
                    <Typography variant="h4" component="h2">
                    <br></br> Carga Pauta 
                    </Typography>
     
                </Box>
                <Card>
                    {/* <CardHeader>
                        <h5 className='title'>Leer Excel Hojas</h5>
                        <p className='category'></p>
                    </CardHeader> */}
                    <CardBody className='all-icons'>
                        <PautaExcelImportar onFileSubir = {(e) => handleFileSubir(e)} tipo = "Importar" />
                    </CardBody>

                </Card>
                </div>
                <div className="col-sm">
                <Box md={12}>
                    <Typography variant="h4" component="h2">
                    <br></br> Visualizar Pautas
                    </Typography>
     
                </Box>
                <Card>
                    {/* <CardHeader>
                        <h5 className='title'>Leer Excel Hojas</h5>
                        <p className='category'></p>
                    </CardHeader> */}
                    <CardBody className='all-icons'>
                        <PautaExcelImportarVisual onFileSubirVisual = {(e) => handleFileSubirVisual(e)} tipo = "Importar" />
                    </CardBody>

                </Card>
                </div>
            </div>
            </div>
                
                
            </Col>
        </Row>

        {
            sheetData &&
            <>
            <CargaVisualPauta  
                plantilla = {sheetData}
                nombre = { sheetNames.toString()} />
            </>
        }
        {
            sheetDataVisual &&
            <>
            <VisualPautaVisual  
             nombrePauta = { sheetDataVisual }
                />
            </>
        }

    </div>
</>
  )
}
