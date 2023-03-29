import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';


const VisualFormato = (props , {id = ''} ) => {
    const defaultMaterialTheme = createTheme(); 
    var j = Number(id);
    const { formatos } = useSelector(state => state.formato);
    //Mejora incorporar a nivel de detalle los campos qeu serán visualizado (cargo, asignación,auditoria,cierre)
    let titulo=[];
    for (let index = 0; index < formatos[j].cabezaJson.length; index++) {
        if (formatos[j].cabezaJson[index] === 'Monitor') {
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }
            ,lookup: { MONITOR1: "MONITOR 1", MONITOR2: "MONITOR 2", MONITOR3: "MONITOR 3", MONITOR4: "MONITOR 4", MONITOR5: "MONITOR 5", MONITOR6: "MONITOR 6", MONITOR7: "MONITOR 7" },filteringPlaceHolder:"Monitor"});
        }
        else{
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
        }
        //titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
    }
    //TypeError: Cannot add property tableData, object is not extensible, hay que formatear con un map la informacion
    const detalle = formatos[j].detalleJson.map(o => ({ ...o }));
    const [tableData, setTableData] = useState(detalle);
    //Capatura la información y la traspasa a componente padre AsignaciónActividadViewDetalle
    props.onActualizaInfo(tableData);
  
  return (
    <>
    <div style={{ width: '100%', height: '80%' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Carga de Formato para realización de asignación"
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

                        options={{
                           selection:true,
                           grouping: true,
                           columnsButton: true,
                           filtering: true,
                           pageSizeOptions:[5,10,20,50,100],
                           pageSize:20,
                           paginationType:"stepped",
                           showTextRowsSelected:false,
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
export default VisualFormato
