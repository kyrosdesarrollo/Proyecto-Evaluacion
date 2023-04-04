import React, { useState } from 'react';
import { Card, Row, Col, CardBody, CardHeader, Table, Label } from 'reactstrap';
import PautaExcelImportar from './PautaExcelImportar';

const PautaExcelView = () => {

  const [sheetData, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);

  const handleSheetChange = (e) => {
    setSheet(e.target.value);
  }

  const handleFileSubir = (e) => {
    console.log("File Subir", e);

    if (e) {
      let sheetNames = Object.keys(e);
      setSheetNames(sheetNames);
      setSheet(sheetNames[0]);
    } else { setSheetNames(null); }

    setSheetData(e);
  }

  return (
    <div className='content'>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <PautaExcelImportar onFileSubir={(e) => handleFileSubir(e)} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {
        sheetData &&
        <Row>
          <Col md={12}>
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    {sheetData[sheet][0].map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheetData[sheet].slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      }
    </div>
  );
}

export default PautaExcelView;
