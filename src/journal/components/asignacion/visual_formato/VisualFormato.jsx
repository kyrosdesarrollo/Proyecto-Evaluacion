import React,{useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';



const VisualFormato = (props ) => {
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
          let filtro = detalle.filter(o => o.Estado === "Carga");
          setTableData(filtro);
    },[j])
   
    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleSetSelectedRows = (e) => {
        setSelectedRows(e);
       
    };
     
    //------------------  Proceso de Seleccion ------------------------------
    //Recorre objeto selección y actualiza estado a Asigna en objeto principal
    //Actualiza todo el objecto a estado carga 
     tableData.forEach((node) => node.Estado = "Carga");

     for (let index = 0; index < selectedRows.length; index++) {
      tableData.filter(function(value) {
        return value.id === selectedRows[index].id; // Solo pasan los que tengan este id seleccionado
      }).forEach(function(value, key) {
        //Búsqueda de numero de objeto para realizar actualizacion.
        let numObjeto = tableData.find((num) => num.id === selectedRows[index].id).tableData.id;
        tableData[numObjeto] = {...tableData[numObjeto], Estado: "Asigna"};
      });
     }
      //------------------  Fin Proceso de Seleccion ------------------------------
    console.log('Inicio 1 Seleccion ....')
    console.log(tableData);
    console.log('Fin.......')
    console.log('Seleccionados')
    console.log(selectedRows)
    // //------------------  Proceso Dejar de Seleccionar ------------------------------
    // //Recorre objeto principal tableData y actualiza estado a Carga 

    if (selectedRows.length <1){
      tableData.forEach((node) => node.Estado = "Carga" );
    }
      //------------------  Fin PrProceso Dejar de Seleccionar ------------------------

   //Captura la información seleccionada y la traspasa a componente padre AsignaciónActividadViewDetalle
   if (selectedRows.length > 0) {
   props.onActualizaInfo(tableData);
   }
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

                        onSelectionChange={(e)=>{
                          handleSetSelectedRows(e);
                         }}                 

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
export default VisualFormato
