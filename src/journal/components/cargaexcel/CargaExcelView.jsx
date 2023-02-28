import React, {useState} from 'react'
import {Card, Row, Col, CardBody,CardHeader, Table, Label} from 'reactstrap';
import { CargaExcelImportar } from './CargaExcelImportar';

export const CargaExcelView = () => {

    const [sheetData, setSheetData] = useState(null);
    const [sheet, setSheet] = useState(null);
    const [sheetNames, setSheetNames] = useState(null);

//[Heders]

//{Data}

const handleSheetChange = (e) =>{
    setSheet(e.target.value);
}

 const handleFileSubir = (e) =>{
    console.log("File Subir", e);

    if (e) { 
        let sheetNames = Object.keys(e);
        setSheetNames(sheetNames);
        setSheet(sheetNames[0]);
    }else{ setSheetNames(null);}

    setSheetData(e);
 }
  return (

    
    <div className='content'>
        <Row>
            <Col md={12}>
                <Card>
                    {/* <CardHeader>
                        <h5 className='title'>Leer Excel Hojas</h5>
                        <p className='category'></p>
                    </CardHeader> */}
                    <CardBody className='all-icons'>
                        <CargaExcelImportar onFileSubir = {(e) => handleFileSubir(e)} />
                    </CardBody>

                </Card>
            </Col>
        </Row>

        {
            sheetData &&
            <>
            {/* <Row>
                <Col md={12}>
                    {sheetNames.map( s =>
                    <div>
                        <input 
                            type="radio" 
                            name="sheetName"
                            checked={ s === sheet}
                            onChange={ (e)=> handleSheetChange(e)}
                            value={s}
                            key={s}
                            />
                        <label>{s}</label>
                    </div>)}
                </Col>
            </Row> */}
            <Row>
                {/* <Label>{sheet}</Label> */}
                <Col md={12}>
                    <Table 
                    bordered 
                    className='border'
                    data-search="true"
                    >
                        <thead className='text-primary'>
                            <tr>
                            {sheetData[sheet][0].map((h)=> (
                                <th key={h}>{h}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                        {sheetData[sheet].slice(1).map((row)=> (
                                <tr >
                                    {row.map( c => <td>{c}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        }
    </div>
  )
}
