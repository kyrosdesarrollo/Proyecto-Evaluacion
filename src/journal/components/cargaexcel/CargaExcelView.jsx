import React, {useState} from 'react'
import {Card, Row, Col, CardBody,CardHeader, Table, Label} from 'reactstrap';
import { CargaExcelImportar } from './CargaExcelImportar';

export const CargaExcelView = () => {

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
            <Row>
                <Col md={12}>
                    <Table 
                    bordered 
                    className='border'
                    data-search="true"
                    
                    >
                        <thead >
                            <tr>
                            {sheetData[sheet][0].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                        {sheetData[sheet].slice(1).map((row)=> (
                                <tr key={row} className = "table-active">
                                    {row.map( c => <td key={c}>{c}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        }
    </div>
    </>
  )
}
