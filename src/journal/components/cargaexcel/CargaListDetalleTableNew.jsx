import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'Pais', headerName: 'Pais', width: 70 , description: 'This column has a value getter and is not sortable.',},
  { field: 'Equipo', headerName: 'Equipo', width: 180 },
  { field: 'Supervisor', headerName: 'Supervisor', width: 230 },
  { field: 'FechadeGestion', headerName: 'Fecha de gestión', width: 130 },
  { field: 'Ejecutivo', headerName: 'Ejecutivo', width: 130 },
  { field: 'Enlace', headerName: 'Enlace', width: 130 },
  { field: 'TMO', headerName: 'TMO', width: 130 },
  { field: 'ANI', headerName: 'ANI', width: 130 },
  { field: 'TipodeAuditoria', headerName: 'Tipo de Auditoria', width: 130 },
  { field: 'Monitor', headerName: 'Monitor', width: 130 },
];
export default function DataTable({lista = ''}) {
const rows = lista;

const headers = rows[0];
console.log('Cabeza')
console.log(headers)

//Considerar solo Data 0 eliminar y comenzar en 1 iinformación.
// data.splice(0,1);
// console.log(data);

console.log(lista);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
      />
    </div>
  );
}