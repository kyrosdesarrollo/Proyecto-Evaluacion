import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { de } from 'date-fns/locale';

const VisualPautaVisual = ({nombrePauta = ''}) => {


  const defaultMaterialTheme = createTheme(); 
  
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  //Busqueda de informaciòn
  const { pautas } = useSelector(state => state.pauta);
  const resultados = pautas.filter((elemento) => elemento.formato === nombrePauta);
 
  useEffect(() => {
  let titulo=[];
  //Verifica si hay infromación
  if (!resultados || resultados.length === 0 || !resultados[0].cabezaJson) {
    setColumns([]);
    setData([]);
    return; // No hay información, se sale del useEffect
  }
  //Recorre arreglo con los datos de titulos de la planilla Excel
    for (let index = 0; index < resultados[0].cabezaJson.length; index++) {
            titulo.push({ title: resultados[0].cabezaJson[index],
                          field: resultados[0].cabezaJson[index]
                          // ,
                          // align: "center", 
                          // headerStyle: { color: "#2196f3" }
                        });
    }
 
    const datos = [];
    
    for (let i = 0; i < resultados[0].detalleJson.length; i++) {
      const id = resultados[0].detalleJson[i].ID;
      const bloques = resultados[0].detalleJson[i]["BLOQUES DE EVALUACIÓN"];
      const categoria = resultados[0].detalleJson[i]["CATEGORÍA"];
      const conducta = resultados[0].detalleJson[i]["CONDUCTA"];//"CUMPLIMIENTO POR BLOQUES"
      const cumplimiento = resultados[0].detalleJson[i]["CUMPLIMIENTO POR CATEGORIA"]
      const cumplimientoBloque = resultados[0].detalleJson[i]["CUMPLIMIENTO POR BLOQUES"]
      const quiebre = resultados[0].detalleJson[i]["QUIEBRE"]

      datos.push({ ID: id,"BLOQUES DE EVALUACIÓN" : bloques, "CATEGORÍA": categoria,"CONDUCTA" : conducta, "CUMPLIMIENTO POR CATEGORIA" : cumplimiento ,"CUMPLIMIENTO POR BLOQUES": cumplimientoBloque, "QUIEBRE": quiebre });
    }
   
    setColumns(titulo);
    setData(datos);
   
  }, [nombrePauta]);
 

 
  return (
  <>
  <div style={{ width: '120%', height: '100%' }}>
  <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title={`Visualización de Pauta : ${nombrePauta}`}
      columns={columns}
      data={data}
      // editable={{
      //   onRowAdd: newData =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         setData([...data, newData]);
              
      //         resolve();
      //       }, 1000)
      //     }),
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataUpdate = [...data];
      //         const index = oldData.tableData.id;
      //         dataUpdate[index] = newData;
      //         setData([...dataUpdate]);

      //         resolve();
      //       }, 1000)
      //     }),
      //   onRowDelete: oldData =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataDelete = [...data];
      //         const index = oldData.tableData.id;
      //         dataDelete.splice(index, 1);
      //         setData([...dataDelete]);
              
      //         resolve()
      //       }, 1000)
      //     }),
      // }}
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

export default VisualPautaVisual;
