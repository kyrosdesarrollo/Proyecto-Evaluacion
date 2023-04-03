import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import ModalComponent from '../Auditoria_modal';


const AuditoriaVisualFormato = ({id = ''}) => {
const defaultMaterialTheme = createTheme();





    var j = Number(id);
    const { formatos } = useSelector(state => state.formato);
    const { pautas } = useSelector(state => state.pauta);
        const plantilla = Object.assign({},formatos[j]);
        const formato = plantilla.formato;

    let titulo=[];
    for (let index = 0; index < formatos[j].cabezaJson.length; index++) {

        if (formatos[j].cabezaJson[index] === 'Monitor') {
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],
                          align: "center", headerStyle: { color: "#2196f3" }

            ,lookup: { MONITOR1: "MONITOR 1", 
                       MONITOR2: "MONITOR 2", 
                       MONITOR3: "MONITOR 3", 
                       MONITOR4: "MONITOR 4", 
                       MONITOR5: "MONITOR 5", 
                       MONITOR6: "MONITOR 6", 
                       MONITOR7: "MONITOR 7" },
                       filterPlaceholder:"Usuario 2CALL"});
        }
        else{
            titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],
              align: "center", headerStyle: { color: "#2196f3" }, filtering:false});
        }
        
    }

    //TypeError: Cannot add property tableData, object is not extensible, hay que formatear con un map la informacion
    const detalle = formatos[j].detalleJson.map(o => ({ ...o }));
      console.log(detalle + "esto es detalle")
    const [tableData, setTableData] = useState(detalle);

    //Carga de pautas da archvo
    const arregloPauta = [];
    Object.keys(pautas).forEach((e) => { 
      if (pautas[e].formato === formato) {
        arregloPauta.push(pautas[e]);
        
      }
    });
  


// modal

  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (event, rowData) => {
    setSelectedRowData(rowData);
    setOpenModal(true);
  }
   




  return (
    <>
    <div style={{ width: '90%', height: '90%' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Carga de Formato para realización de asignación"
                        columns={titulo}
                        data={tableData} 
                        onRowClick={handleRowClick}                 
                       editable={{
                      
                          onRowUpdate: (newRow, oldRow) => 
                          new Promise((resolve, reject) => {
                            const updatedData = [...tableData]
                            updatedData[oldRow.tableData.id] = newRow
                            setTableData(updatedData)
                            onCellClick={handleCellClick}  // handler para modal
                            setTimeout(() => resolve(), 500)
                          })
                         
                        }}

                        options={{
                            grouping:  true,
                            filtering: true,
                            pageSizeOptions:[5,10,20,50,100],
                            pageSize:20,
                            paginationType:"stepped",
                            
                           
                          }}
                    />
                  <ModalComponent open={openModal} onClose={() => setOpenModal(false)} rowData={selectedRowData} />

                </ThemeProvider>
            </div>
        </>
    ) 
   }
    export default AuditoriaVisualFormato