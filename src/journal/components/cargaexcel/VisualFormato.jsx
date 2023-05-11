import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';

const CargaVisualFormato = (props) => {

  const defaultMaterialTheme = createTheme(); 
  const [sheetData, setSheetData] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);

  //Extrae los formatos desde Redux
  const { funcionario } = useSelector(state => state.funcionario);
  //Filtramos solo los monitores activos 1 = SI y Tipo 1 = Monitor
  const funcionariosFiltrados = [];
  if (funcionario.length > 0) {
    for (let i = 0; i < funcionario[0].funcionarios.length; i++) {
      const funcionarioActual = funcionario[0].funcionarios[i];
      if (funcionarioActual.Tipo === "1" && funcionarioActual.Activo === "1") {
          funcionariosFiltrados.push(funcionarioActual.Nombre);
      }
      }
  }else{
    for (let i = 0; i < funcionario.funcionarios.length; i++) {
      const funcionarioActual = funcionario.funcionarios[i];
      if (funcionarioActual.Tipo === "1" && funcionarioActual.Activo === "1") {
          funcionariosFiltrados.push(funcionarioActual.Nombre);
      }
      }
  }
  //Extrae el nombre de la hoja
  let nombre = props.nombre.toString();
  let titulo=[];
  //Incluye monitores para selección
  for (let index = 0; index < props.plantilla[nombre][0].length; index++) {
    if (props.plantilla[nombre][0][index] === "Monitor") {
        titulo.push({ title: "Monitor",
                      field: "Monitor",
                      lookup: funcionariosFiltrados.reduce((obj, item) => {
                          obj[item] = item;
                          return obj;
                      }, {})
        });
    } else {
        titulo.push({ title: props.plantilla[nombre][0][index],
                      field: props.plantilla[nombre][0][index]
                    });
    }
}
  //Convierte los datos de titulo  para ser reflejados en MaterialTable  
  const columnsWithTableData = titulo.map((column) => {
    const { tableData, ...rest } = column; // Desestructurar la propiedad tableData del objeto y asignar el resto de propiedades a la variable "rest"
    return {
      ...rest, // Asignar todas las propiedades del objeto "rest"
      tableData: { ...tableData }, // Asignar la propiedad tableData original al nuevo objeto
    };
  });

  
  const columns = window.myGlobalVariable;

   //Convierte los datos de detalle  para ser reflejados en MaterialTable  
   const columnsWithTableDetail = columns.map((column) => {
    const { tableData, ...rest } = column; // Desestructurar la propiedad tableData del objeto y asignar el resto de propiedades a la variable "rest"
    return {
      ...rest, // Asignar todas las propiedades del objeto "rest"
      tableData: { ...tableData }, // Asignar la propiedad tableData original al nuevo objeto
    };
  });
  const [data, setData] = useState(columnsWithTableDetail);
  const handleFileSubir = (e) =>{
    if (e) { 
        let sheetNames = Object.keys(e);
        setSheetNames(sheetNames);
        setSheet(sheetNames[0]);
    }else{ setSheetNames(null);}

    setSheetData(e);
 }

  return (
  <>
  <div style={{ width: '120%', height: '100%' }}>
  <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Carga de archivo Excel"
      columns={columnsWithTableData}
      data={data}
      editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve, reject) => {
        //     setData([...data, newData]);
        //     resolve();
        //   }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     // Obtener el índice del registro a actualizar
        //     const index = data.indexOf(oldData);
        //      // Actualizar el registro
        //      const updatedData = [
        //       ...columnsWithTableDetail.slice(0, index),
        //       { ...oldData, ...newData },
        //       ...columnsWithTableDetail.slice(index + 1)
        //     ];
        //     setData(updatedData);
        //     resolve();
        //   }),
        // onRowDelete: (oldData) =>
        //   new Promise((resolve, reject) => {
        //     const updatedData = [...data];
        //     const index = updatedData.indexOf(oldData);
        //     updatedData.splice(index, 1);
        //     setData(updatedData);
        //     resolve();
        //   }),
        
      }}
      options={{
        //  showTextRowsSelected:false,
        // selection:true,
         grouping: true,
         columnsButton: true,
         filtering: true,
         pageSizeOptions:[5,10,20,50,100],
         pageSize:10,
         paginationType:"stepped",
         rowStyle: {
              fontSize: 10,
          },
        // headerStyle: {
        //   backgroundColor: '#01579b',
        //   color: '#FFF',
        //   fontSize: 12,
        // }                                  
        }}
    />
    </ThemeProvider>
    </div>
    </>
  );
}

export default CargaVisualFormato;
