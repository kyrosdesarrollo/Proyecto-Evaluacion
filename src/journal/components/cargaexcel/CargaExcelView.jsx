import React, {useState} from 'react'
import {Card, Row, Col, CardBody,CardHeader, Table, Label} from 'reactstrap';
import { CargaExcelImportar } from './CargaExcelImportar';
import CargaVisualFormato from './VisualFormato';

export const CargaExcelView = (props) => {

    const [sheetData, setSheetData] = useState(null);
    const [sheet, setSheet] = useState(null);
    const [sheetNames, setSheetNames] = useState(null);
    
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
   
  return (
    <>
    
    <div >
        <Row>
            <Col md={20}>
                <Card>
                    <CardBody className='all-icons'>
                        <CargaExcelImportar 
                            onFileSubir = {(e) => handleFileSubir(e)} />
                    </CardBody>

                </Card>
            </Col>
        </Row>

        {
            sheetData &&
            <>
            <CargaVisualFormato  
                plantilla = {sheetData}
                nombre = { sheetNames.toString()} />

            </>
        }
    </div>
    </>
  )
}
