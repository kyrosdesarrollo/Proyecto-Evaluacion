import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { de } from 'date-fns/locale';

const VisualPautaVisual = ({nombrePauta = ''}) => {

  //Busqueda de informaciòn
  const { pautas } = useSelector(state => state.pauta);
  const resultados = pautas.filter((elemento) => elemento.formato === nombrePauta);

  console.log(resultados)
  //const titulo = 

  const defaultMaterialTheme = createTheme(); 
  // const [sheetData, setSheetData] = useState(null);
  // const [sheetNames, setSheetNames] = useState(null);
  // //Extrae el nombre de la hoja
  // let nombre = props.nombre.toString();

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]);

  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ]);

  return (
  <>
  <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title={`Visualización de Pauta : ${nombrePauta}`}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
  )
    </ThemeProvider>
    </>
  );
}

export default VisualPautaVisual;
