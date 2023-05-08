import React,{useCallback, useEffect, useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import ModalComponent from '../Auditoria_modal';
import Swal from 'sweetalert2'

const AuditoriaVisualFormato = (props) => {
 
  const defaultMaterialTheme = createTheme();
  const { formatos } = useSelector(state => state.formato);
  const plantilla = Object.assign({}, formatos[Number(props.id)]);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  //Extraer nombre de usario
  const { displayName } = useSelector(state => state.auth);
  //Extraer perfil de usuario
  const { perfil } = useSelector(state => state.perfil);

  const titulo = plantilla.cabezaJson.map((title) => ({
    title: title,
    field: title,
    align: 'center',
    headerStyle: { color: '#2196f3' },
    filtering: false,
  }));

  useEffect(() => {
    const detalle = plantilla.detalleJson.map((o) => ({ ...o }));
    let filtro;
    if (perfil === "ADMINISTRADOR") {
       filtro = detalle.filter((o) => o.Estado === 'Asigna');
    }
    else{
       filtro = detalle.filter((o) => o.Estado === 'Asigna' && o.Monitor === displayName);

    }
    //Creación de nuevo arreglo para limpiar información que viene con selección
    const nuevoArreglo = filtro.map(objeto => {
      const { tableData, ...nuevoObjeto } = objeto;
      return nuevoObjeto;
    });

    //Envio de información depurada    
    setTableData(nuevoArreglo);
  },[props.id]);


const [selectedRows, setSelectedRows] = useState([]);

const handleSelectionChange = (rows) => {
  setSelectedRows(rows.map(row => row.tableData.id));
  props.updateSelectRowValue(rows)
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
      <div style={{ width: '110%', height: '100%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Completar Evaluación a nivel de registro"
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
                           selected: selected,
                            //rowStyle: {
                            //     fontSize: 10,
                            // }
                            rowStyle: rowData => ({
                              fontSize: 10,
                              backgroundColor: rowData.tableData.id === selectedRowData?.tableData.id ? '#f2f2f2' : 'inherit'
                            }),
                            
            }}
            onSelectionChange={handleSelectionChange}
             
            
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
