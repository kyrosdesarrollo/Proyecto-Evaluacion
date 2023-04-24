import React,{useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';



const CierreVisualFormato = (props ) => {
    const defaultMaterialTheme = createTheme(); 
    const [tableData, setTableData] = useState([]);
    const [titulo, setTitulo] = useState([]);
    let j = Number(props.id);
    //Extrae los formatos desde Redux
    const { formatos } = useSelector(state => state.formato);
  //Mejora incorporar a nivel de detalle los campos qeu serán visualizado (cargo, asignación,auditoria,cierre)
    useEffect(() => {
          j = Number(props.id);
          let titulo=[];
          for (let index = 0; index < formatos[j].cabezaJson.length; index++) {
              // if (formatos[j].cabezaJson[index] === 'Monitor') {
              //     titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }
              //     ,lookup: { MONITOR1: "MONITOR 1", 
              //                MONITOR2: "MONITOR 2", 
              //                MONITOR3: "MONITOR 3", 
              //                MONITOR4: "MONITOR 4", 
              //                MONITOR5: "MONITOR 5", 
              //                MONITOR6: "MONITOR 6", 
              //                MONITOR7: "MONITOR 7", MONITOR :formatos[j].cabezaJson[index] },filteringPlaceHolder:"Monitor"});
              // }
              // else{
                  titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
             // }
              //titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
          }
          setTitulo(titulo);
          let detalle = formatos[j].detalleJson.map(o => ({ ...o }));
          //Filtro para considerar a nivel de línea estado con nombre Carga
          let filtro = detalle.filter(o => o.Estado === "Cierre");
          setTableData(filtro);
    },[j])
   
    const [selectedRows, setSelectedRows] = React.useState([]);
    //Captura la información seleccionad de Datable
    const handleSelectionChange = (rows) => {
      console.log('Aqui')
      console.log(rows)
      setSelectedRows(rows.map(row => row.tableData.id));
      props.updateSelectRowValue(rows);
    }
     
  //   //Verifica si no hay nada seleccionado
  //   if (selectedRows.length <1){
  //     tableData.forEach((node) => node.Estado = "Carga" );
  //   }
  //  //Captura la información seleccionada y la traspasa a componente padre AsignaciónActividadViewDetalle
  //  if (selectedRows.length > 0) {
  //  props.onActualizaInfo(tableData);
  //  }
  return (
    <>
    <div style={{ width: '100%', height: '80%' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Realización de cierre"
                        columns={titulo}
                        data={tableData} 
                        editable={{
                          // onRowAdd: (newRow) => new Promise((resolve, reject) => {
                          //   setTableData([...tableData, newRow])
                          //   setTimeout(() => resolve(), 500)
                          // }),
                          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                            const updatedData = [...tableData]
                            updatedData[oldRow.tableData.id] = newRow
                            setTableData(updatedData)
                            setTimeout(() => resolve(), 500)
                          })
                          ,
                          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                            const updatedData = [...tableData]
                            updatedData.splice(selectedRow.tableData.id, 1)
                            setTableData(updatedData)
                            setTimeout(() => resolve(), 1000)
                          })
                        }}

                        onSelectionChange={handleSelectionChange}            

                        options={{
                          //  showTextRowsSelected:false,
                           selection:true,
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
  )
}
export default CierreVisualFormato

