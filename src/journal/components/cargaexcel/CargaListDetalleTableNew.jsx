import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as VariableGlobal from '../../../global';


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
console.log(headers[0]);

const columnasEditadas = [];
const cabeluca = headers[0];

let i = 0; let linea='';let linea1=''; let cabeza = [];let cabeza1 = []
for (i = 0; i < headers.length; i++) {
  linea  = ('field: '+'\''+ headers[i] +'\', headerName: '+ '\''+ headers[i] +'\''+ ', width: 100' );
  linea1 = ('{field: '+'\''+ headers[i] +'\', headerName: '+ '\''+ headers[i] +'\''+ ', width: 100 },' );
  console.log(linea)
  console.log(linea1)
  cabeza.push(Object.assign({},linea));
  cabeza1.push(linea1);
  columnasEditadas.push('{'+linea+'},');
  linea = '';
} 
console.log('1) Columnas No Editadas');
console.log(columns);

console.log('2) Columnas Editadas Objeto');
console.log(cabeluca);


console.log('3) Columnas Editadas Cabeza');
console.log(cabeza);

console.log('4) Columnas Editadas Cabeza1');
console.log(Object.assign(cabeza1));

console.log('5) Columnas Editadas Cabeza');
console.log(JSON.parse(JSON.stringify(cabeza)));




// console.log('4) Columnas Editadas JSON');
// console.log(JSON.parse(linea));

// const columnasObject = Object.assign({}, columns);
// console.log('3) Columnas Editadas con Objeto');
// console.log(columnasObject);

// let arreglin = [];
// arreglin = Object.values(columnasObject);
// console.log('4) Columnas Editadas con Objeto a Arrglo');
// console.log(arreglin);

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