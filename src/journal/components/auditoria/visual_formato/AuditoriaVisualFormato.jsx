import React,{useCallback, useEffect, useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import ModalComponent from '../Auditoria_modal';

const AuditoriaVisualFormato = (props) => {
 
  const defaultMaterialTheme = createTheme();
  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({}, formatos[Number(props.id)]);

  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);


  const titulo = plantilla.cabezaJson.map((title) => ({
    title: title,
    field: title,
    align: 'center',
    headerStyle: { color: '#2196f3' },
    filtering: false,
  }));

  useEffect(() => {
    const detalle = plantilla.detalleJson.map((o) => ({ ...o }));
    const filtro = detalle.filter((o) => o.Estado === 'Asigna');
    //Creación de nuevo arreglo para limpiar información que viene con selección
    const nuevoArreglo = filtro.map(objeto => {
      const { tableData, ...nuevoObjeto } = objeto;
      return nuevoObjeto;
    });
    //Envio de información depurada
    console.log('Nuevo Arreglo')
    console.log(nuevoArreglo)
    setTableData(nuevoArreglo);
  },[props.id]);


   //Selección de dato de linea y habré modal
  const handleRowClick = useCallback((event, rowData) => {
    setSelectedRowData(rowData);
    setOpenModal(true);
  }, []);
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
      <div style={{ width: '90%', height: '90%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Carga de Formato para realización de asignación"
            columns={titulo}
            data={tableData}
            onRowClick={handleRowClick}
            editable={{
              // onRowUpdate: (newRow, oldRow) =>
              //   new Promise((resolve, reject) => {
              //     const updatedData = [...tableData];
              //     updatedData[oldRow.tableData.id] = newRow;
              //     setTableData(updatedData);
              //     setTimeout(() => resolve(), 500);
              //   }),
            }}
            options={{
                           selection:true,
                           initialSelectedRowIds: [],
                           grouping: true,
                           columnsButton: true,
                           filtering: true,
                           pageSizeOptions:[5,10,20,50,100],
                           pageSize:10,
                           paginationType:"stepped",
                           selected: [],
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
  );
};

export default AuditoriaVisualFormato;
