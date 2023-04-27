import React,{useRef} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';


const FuncionarioVisualFormato = (props) => {
 
  const defaultMaterialTheme = createTheme();
  const tableRef = useRef(null);

  //Agregar nuevo reegistro
  function handleAdd(newData) {
    // Obtener la lista actual de datos
    const data = tableRef.current.dataManager.data;
    // Agregar el nuevo registro a la lista
    data.push(newData);
    // Actualizar los datos de la tabla
    tableRef.current.setData(data);
  }
 
  return (
    <>
      <div style={{ width: '90%', height: '90%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
         <MaterialTable
        title="Funcionarios "
        columns={[
          {title: 'Nombre', field: 'Nombre'},
          {title: 'Correo', field: 'Correo'},
          { title: 'Funcion', field: 'Funcion',lookup: { 34: 'MONITOR', 63: 'ENCARGADO' },},
        ]}
        data={[
          { Nombre: 'Catherine Echeverria', Correo: 'catherine.echeverria@2call.cl', Funcion: 34 },
          { Nombre: 'Paula Barrera', Correo: 'paula.barrera@2call.cl', Funcion: 63 },
          { Nombre: 'Benjamín Arce', Correo: 'benjamin.arce@2call.cl', Funcion: 34 },
        ]}
        tableRef={tableRef}
        options={{
                           selection:true,
                           initialSelectedRowIds: [],
                           grouping: true,
                           columnsButton: true,
                           filtering: true,
                           pageSizeOptions:[5,10,20,50,100],
                           pageSize:10,
                           
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleAdd(newData);
                resolve();
              }, 1000);
            }),
        }}
      />
        </ThemeProvider>
      </div>
    </>
  );
};

export default FuncionarioVisualFormato;
