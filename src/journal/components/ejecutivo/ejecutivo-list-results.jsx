import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  {
    field: 'age',
    headerName: 'Año',
    type: 'number',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Nombre completo',
    description: 'Esta columana posee el valor concatenado y no se puede realizar bésqueda',
    sortable: false,
    width: 260,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Arce', firstName: 'Benjamin', age: 35 },
  { id: 2, lastName: 'Vidal', firstName: 'Marco', age: 42 },
  { id: 3, lastName: 'Soto', firstName: 'Juanito', age: 45 },
  { id: 4, lastName: 'Perez', firstName: 'Roberto', age: 16 },
  { id: 5, lastName: 'Rojas', firstName: 'Daniel', age: null },
  { id: 6, lastName: 'Palma', firstName: 'Pedro', age: 150 },
  { id: 7, lastName: 'Arcos', firstName: 'Jessica', age: 44 },
  { id: 8, lastName: 'Mellado', firstName: 'Martita', age: 36 },
  { id: 9, lastName: 'Ordenes', firstName: 'Jose', age: 65 },
  { id: 10, lastName: 'Ordenes', firstName: 'Jose', age: 65 },
  { id: 11, lastName: 'Ordenes', firstName: 'Jose', age: 65 },
];

export default function DataTableEjecutivo() {
  return (
    <div style={{ height: 500, width: '70%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}