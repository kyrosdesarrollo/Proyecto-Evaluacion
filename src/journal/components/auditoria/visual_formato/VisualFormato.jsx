import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';


const VisualFormato = ({id = ''}) => {
    const defaultMaterialTheme = createTheme();

    var j = Number(id);
    const { formatos } = useSelector(state => state.formato);
    const { pautas } = useSelector(state => state.pauta);
        const plantilla = Object.assign({},formatos[j]);
        const formato = plantilla.formato;

    let titulo=[];
    for (let index = 0; index < formatos[j].cabezaJson.length; index++) {

        if (formatos[j].cabezaJson[index] === 'Monitor') {
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }
            ,lookup: { MONITOR1: "MONITOR 1", MONITOR2: "MONITOR 2", MONITOR3: "MONITOR 3", MONITOR4: "MONITOR 4", MONITOR5: "MONITOR 5", MONITOR6: "MONITOR 6", MONITOR7: "MONITOR 7" },filterPlaceholder:"Usuario 2CALL"});
        }
        else{
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }, filtering:false});
        }
        //titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
    }

    //TypeError: Cannot add property tableData, object is not extensible, hay que formatear con un map la informacion
    const detalle = formatos[j].detalleJson.map(o => ({ ...o }));

    const [tableData, setTableData] = useState(detalle);

    titulo.push({title:"Velocidad al Contestar" ,field: "velocidad" ,filtering:false });
    titulo.push({title:"Saludo " ,field: "Saludo " ,filtering:false });
    titulo.push({title:"Validación" ,field: "Validación" ,filtering:false });
    titulo.push({title:"Compresión Activa" ,field: "Compresión Activa" ,filtering:false });
    titulo.push({title:"Actitud de Servicio" ,field: "Actitud de Servicio" ,filtering:false });
    titulo.push({title:"Ortografía" ,field: "Ortografía" ,filtering:false });
    titulo.push({title:"Personalización" ,field: "Personalización" ,filtering:false });
    titulo.push({title:"2. Observación" ,field: "2. Observación" ,filtering:false });
    titulo.push({title:"Conocimiento de Producto" ,field: "Conocimiento de Producto" ,filtering:false });
    titulo.push({title:"Manejo de Silencios" ,field: "Manejo de Silencios" ,filtering:false });
    titulo.push({title:"Compromiso de Gestión" ,field: "Compromiso de Gestión" ,filtering:false });
    titulo.push({title:"Compromiso de Gestión" ,field: "Compromiso de Gestión" ,filtering:false });
    //Carga de pautas da archvo
    const arregloPauta = [];
    Object.keys(pautas).forEach((e) => { 
      if (pautas[e].formato === formato) {
        arregloPauta.push(pautas[e]);
      }
    });
    console.log('Aqu estoy con Arreglo de Pauta');
    console.log(arregloPauta)


  return (
    <>
    <div style={{ width: '90%', height: '90%' }}>
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
                          // ,
                          // onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                          //   const updatedData = [...tableData]
                          //   updatedData.splice(selectedRow.tableData.id, 1)
                          //   setTableData(updatedData)
                          //   setTimeout(() => resolve(), 1000)
                
                          // })
                        }}

                        options={{
                            grouping:  true,
                            filtering: true,
                            pageSizeOptions:[5,10,20,50,100],
                            pageSize:10,
                            paginationType:"stepped"
                          }}
                    />
                </ThemeProvider>
     </div>
    </>
  )
}
export default VisualFormato