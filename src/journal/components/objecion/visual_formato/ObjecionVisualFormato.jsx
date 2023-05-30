import React,{useCallback,useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import ModalComponent from '../Objecion_modal';
import Swal from 'sweetalert2'

const ObjecionVisualFormato = (props ) => {
    const defaultMaterialTheme = createTheme(); 
    const [tableData, setTableData] = useState([]);

    const { formatos } = useSelector(state => state.formato);
    const plantilla = Object.assign({}, formatos[Number(props.id)]);
    //Control de Modal y seleccion de registro
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const [titulo, setTitulo] = useState([]);
    let j = Number(props.id);
  
  //Mejora incorporar a nivel de detalle los campos qeu serán visualizado (cargo, asignación,auditoria,cierre)
    useEffect(() => {
          j = Number(props.id);
          let titulo=[];
          for (let index = 0; index < formatos[j].cabezaJson.length; index++) {
                  titulo.push({ title: formatos[j].cabezaJson[index],field: formatos[j].cabezaJson[index],align: "center", headerStyle: { color: "#2196f3" }});
          }
          setTitulo(titulo);
          let detalle = formatos[j].detalleJson.map(o => ({ ...o }));
          //Filtro para considerar a nivel de línea estado con nombre Carga
          let filtro = detalle.filter(o => o.Estado === "Finalizado");
          setTableData(filtro);
    },[j])
   
    const [selectedRows, setSelectedRows] = React.useState([]);
    //Captura la información seleccionad de Datable
    const handleSelectionChange = (rows) => {
      setSelectedRows(rows.map(row => row.tableData.id));
      props.updateSelectRowValue(rows);
    }
     
  //Selección de registro y validación.
const handleRowClick = (event, rowData) => {
  if (selectedRows.includes(rowData.tableData.id)) {
    // la fila está seleccionada, mostrar modal
    setOpenModal(true);
    setSelectedRowData(rowData);
  } else {
    // la fila no está seleccionada, no hacer nada
    Swal.fire({
      confirmButtonColor: '#2196f3',
      icon: 'error',
      title: 'Selección de registro',
      text: 'Favor de seleccionar registro para realizar encuesta.',
    });
     return
  }
}
  //Cierre
  const handleModalClose = useCallback(() => {
    setSelectedRowData(null);
    setOpenModal(false);
  }, []);

  useEffect(() => {
    if (!openModal) {
      setSelectedRowData(null);
    }
  }, [openModal]);

  return (
    <>
    <div style={{ width: '120%', height: '100%' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Realización de cierre"
                        columns={titulo}
                        data={tableData} 
                        onRowClick={handleRowClick}
                        onSelectionChange={handleSelectionChange}            

                        options={{
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
                                                        
                          }}
                    />

                <ModalComponent 
                            open={openModal}
                            onClose={handleModalClose} // Usa la función de devolución de llamada actualizada
                            rowData={selectedRowData}
                            pauta ={props.nombrePauta}
                            formato = {plantilla}
                            
                          />
                </ThemeProvider>
     </div>
    </>
  )
}
export default ObjecionVisualFormato

