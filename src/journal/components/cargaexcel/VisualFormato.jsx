import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { de } from 'date-fns/locale';

const CargaVisualFormato = (props) => {

  const defaultMaterialTheme = createTheme(); 
  const [sheetData, setSheetData] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);

  //Extrae el nombre de la hoja
  let nombre = props.nombre.toString();
  let titulo=[];
  //Recorre arreglo con los datos de titulos de la planilla Excel
    for (let index = 0; index < props.plantilla[nombre][0].length; index++) {
            titulo.push({ title: props.plantilla[nombre][0][index],
                          field: props.plantilla[nombre][0][index]
                          // ,
                          // align: "center", 
                          // headerStyle: { color: "#2196f3" }
                        });
    }
 
  //Convierte los datos de titulo  para ser reflejados en MaterialTable  
  const columnsWithTableData = titulo.map((column) => {
    const { tableData, ...rest } = column; // Desestructurar la propiedad tableData del objeto y asignar el resto de propiedades a la variable "rest"
    return {
      ...rest, // Asignar todas las propiedades del objeto "rest"
      tableData: { ...tableData }, // Asignar la propiedad tableData original al nuevo objeto
    };
  });

  const [data, setData] = useState(titulo);
  const columns = window.myGlobalVariable;

   //Convierte los datos de detalle  para ser reflejados en MaterialTable  
   const columnsWithTableDetail = columns.map((column) => {
    const { tableData, ...rest } = column; // Desestructurar la propiedad tableData del objeto y asignar el resto de propiedades a la variable "rest"
    return {
      ...rest, // Asignar todas las propiedades del objeto "rest"
      tableData: { ...tableData }, // Asignar la propiedad tableData original al nuevo objeto
    };
  });

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
  <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Carga de archivo Excel"
      columns={columnsWithTableData}
      data={columnsWithTableDetail}
      editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve, reject) => {
        //     setData([...data, newData]);
        //     resolve();
        //   }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     const index = data.indexOf(oldData);
        //     const updatedData = [...data];
        //     updatedData[index] = newData;
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
    </>
  );
}

export default CargaVisualFormato;
