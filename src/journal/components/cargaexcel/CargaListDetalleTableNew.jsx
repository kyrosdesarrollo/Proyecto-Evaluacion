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
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];

const rows1 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable({lista = ''}) {
const rows = lista;

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