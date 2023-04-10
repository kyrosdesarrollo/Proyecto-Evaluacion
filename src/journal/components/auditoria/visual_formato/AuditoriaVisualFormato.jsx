import React,{useCallback, useEffect, useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import ModalComponent from '../Auditoria_modal';

const AuditoriaVisualFormato = (props) => {
 
  console.log("Recibiendo de view detalle")
  console.log(props.nombrePauta)
  
  const defaultMaterialTheme = createTheme();
  const { formatos } = useSelector(state => state.formato);
  const { pautas } = useSelector(state => state.pauta);
  const plantilla = Object.assign({}, formatos[Number(props.id)]);
  const formato = plantilla.formato;

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
    setTableData(filtro);
  }, [plantilla.detalleJson]);

  const handleRowClick = useCallback((event, rowData) => {
    console.log('Visualiza rowData click')
    console.log(rowData)
    setSelectedRowData(rowData);
    setOpenModal(true);
  }, []);
  
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
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  const updatedData = [...tableData];
                  updatedData[oldRow.tableData.id] = newRow;
                  setTableData(updatedData);
                  setTimeout(() => resolve(), 500);
                }),
            }}
            options={{
              grouping: true,
              filtering: true,
              pageSizeOptions: [5, 10, 20, 50, 100],
              pageSize: 20,
              paginationType: 'stepped',
            }}
          />
          <ModalComponent 
            open={openModal}
            onClose={handleModalClose} // Usa la función de devolución de llamada actualizada
            rowData={selectedRowData}
            pauta ={props.nombrePauta}
            
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default AuditoriaVisualFormato;
