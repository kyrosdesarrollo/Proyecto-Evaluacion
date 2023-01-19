import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({ lista = '' }) {
  const rows = lista;  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">País</TableCell>
            <TableCell >Equipo&nbsp;</TableCell>
            <TableCell >Supervisor&nbsp;</TableCell>
            <TableCell >Fecha de Gestión&nbsp;</TableCell>
            <TableCell >Ejecutivo&nbsp;</TableCell>
            <TableCell >Enlace&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Id}
              </TableCell>
              <TableCell >{row.Pais}</TableCell>
                      <TableCell >{row.Equipo}</TableCell>
                      <TableCell >{row.Supervisor}</TableCell>
                      <TableCell align="right">{row.FechadeGestion}</TableCell>
                      <TableCell >{row.Ejecutivo}</TableCell>
                      <TableCell >{row.Enlace}</TableCell>
                      <TableCell >{row.TMO}</TableCell>
                      <TableCell >{row.ANI}</TableCell>
                      <TableCell >{row.TipodeAuditoria}</TableCell>
                      <TableCell >{row.Monitor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}