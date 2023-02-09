import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as VariableGlobal from '../../../global';
import { HeadsetRounded } from '@mui/icons-material';

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

const headers = VariableGlobal.ListaHeaders.FileReader;
console.log('Cabeza con Varable Global')
console.log(headers)
let i = 0;
for (i = 0; i < headers.length; i++) {
  console.log(headers[i]);
} 

//Considerar solo Data 0 eliminar y comenzar en 1 iinformación.
//lista.splice(0,1);
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