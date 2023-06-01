import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';

export const InformeCampanaDetalle = () => {
  const defaultMaterialTheme = createTheme();

  const tableData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 40, city: 'Chicago' },
    { id: 4, name: 'Alice Williams', age: 35, city: 'Houston' },
  ];

  const getInitialExpandedState = () => {
    // Devuelve un objeto con el estado de expansión inicial para cada fila
    const initialExpandedState = {};
    tableData.forEach((row) => {
      initialExpandedState[row.id] = false;
    });
    return initialExpandedState;
  };

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Age', field: 'age' },
    { title: 'City', field: 'city' },
  ];

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        title="User Data"
        data={tableData}
        columns={columns}
        options={{
          search: true,
          paging: true,
          filtering: true,
          exportButton: true,
          exportAllData: true,
          defaultExpanded: getInitialExpandedState, // Utiliza la función para establecer el estado de expansión inicial
        }}
      />
    </ThemeProvider>
  );
};
