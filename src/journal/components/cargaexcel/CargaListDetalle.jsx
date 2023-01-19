import React from 'react'
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

export const CargaListDetalle = ({lista = '', formato = ''}) => {
    const [selectedListaIds, setSelectedListaIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    const handleSelectAll = (event) => {
      let newSelectedListaIds;
  
      if (event.target.checked) {
        newSelectedListaIds = lista.map((lista) => lista.id);
      } else {
        newSelectedListaIds = [];
      }
  
      setSelectedListaIds(newSelectedListaIds);
    };
  
    const handleSelectOne = (event, id) => {
      const selectedIndex = selectedListaIds.indexOf(id);
      let newSelectedListaIds = [];
  
      if (selectedIndex === -1) {
        newSelectedListaIds = newSelectedListaIds.concat(selectedListaIds, id);
      } else if (selectedIndex === 0) {
        newSelectedListaIds = newSelectedListaIds.concat(selectedListaIds.slice(1));
      } else if (selectedIndex === selectedListaIds.length - 1) {
        newSelectedListaIds = newSelectedListaIds.concat(selectedListaIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedListaIds = newSelectedListaIds.concat(
          selectedListaIds.slice(0, selectedIndex),
          selectedListaIds.slice(selectedIndex + 1)
        );
      }
  
      setSelectedListaIds(newSelectedListaIds);
    };
  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    return (
      <Card >
        <PerfectScrollbar >
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedListaIds.length === lista.length}
                      color="primary"
                      indeterminate={
                        selectedListaIds.length > 0
                        && selectedListaIds.length < lista.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    NEGOCIO
                  </TableCell>
                  <TableCell>
                    PAIS
                  </TableCell>
                  <TableCell>
                    EQUIPO
                  </TableCell>
                  <TableCell>
                    RUT 
                  </TableCell>
                  <TableCell>
                    NOMBRE 
                  </TableCell>
                  <TableCell>
                    ID_EJECUTIVO 
                  </TableCell>
                  <TableCell>
                    HORA CONTRATO
                  </TableCell>
                  <TableCell>
                    FTE
                  </TableCell>
                  <TableCell>
                    TURNO/JORNADA
                  </TableCell>
                  <TableCell>
                    SUPERVISOR
                  </TableCell>
                  <TableCell>
                    RUT
                  </TableCell>
                </TableRow>
              </TableHead> <TableBody>
                {lista.slice(0, limit).map((lista) => (
                  <TableRow
                    hover
                    key={lista.id}
                    selected={selectedListaIds.indexOf(lista.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedListaIds.indexOf(lista.id) !== -1}
                        onChange={(event) => handleSelectOne(event, lista.id)}
                        value="true"
                      />
                    </TableCell>
                    
                    <TableCell>
                      {lista.id}
                    </TableCell>
                    <TableCell>
                      {lista.NEGOCIO}
                    </TableCell>
                    <TableCell>
                      {lista.PAIS}
                    </TableCell>
                    <TableCell>
                      {lista.EQUIPO}
                    </TableCell>
                    <TableCell>
                      {lista.RUTDV}
                    </TableCell>
                    <TableCell>
                      {lista.NOMBRE}
                    </TableCell>
                    <TableCell>
                      {lista.ID_EJECUTIVO}
                    </TableCell>
                    <TableCell>
                      {lista.HORA_CONTRATO }
                    </TableCell>
                    <TableCell>
                      {lista.FTE }
                    </TableCell>
                    <TableCell>
                      {lista.TURNO_JORNADA }
                    </TableCell>
                    <TableCell>
                      {lista.SUPERVISOR }
                    </TableCell>
                    <TableCell>
                      {lista.RUT_S }
                    </TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
             
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={lista.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    );
  };

