import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { funcionarioStartNew } from '../../../../store/funcionario/thunks';

const FuncionarioVisualFormato = () => {
 
    const defaultMaterialTheme = createTheme();
    const dispatch = useDispatch();

    const columns = [
      { title: 'Nombre', field: 'Nombre' },
      { title: 'Correo', field: 'Correo' },
      { title: 'Tipo',   field: 'Tipo',lookup: { 1: 'Monitor', 2: 'Encargado' }},
      { title: 'Activo', field: 'Activo',lookup: { 1: 'SI', 2: 'NO' }},
    ];
    const [data, setData] = useState([
      { Nombre: 'Juan Perez', Correo: 'juan.perez@2call.cl', Tipo: 1 , Activo: 1},
      { Nombre: 'Pedro Rojas', Correo: 'pedro.rojas@2call.cl', Tipo: 2 , Activo: 1},
      { Nombre: 'Diego Rojas', Correo: 'diego.rojas@2call.cl', Tipo: 2 , Activo: 1},
    ]);
    
    const handleGuardarInformacion = () => {
      console.log(data)
      Swal.fire({
        title: 'Funcionario',
        text: "¿ Estas seguro de actualizar información ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(funcionarioStartNew(data));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    };
  
              
    return (
      <>
        <div style={{ width: '90%', height: '90%' }}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Configuración Funcionarios"
              columns={columns}
              data={data}
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setData([...data, newData]);
                      resolve();
                    }, 1000)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const updatedData = [...data];
                      updatedData[updatedData.indexOf(oldData)] = newData;
                      setData(updatedData);
                      resolve();
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const updatedData = [...data];
                      updatedData.splice(updatedData.indexOf(oldData), 1);
                      setData(updatedData);
                      resolve();
                    }, 1000)
                  }),
              }}
              options={{
                //selection:true,
                initialSelectedRowIds: [],
                grouping: true,
                columnsButton: true,
                filtering: true,
                //actionsColumnIndex: -1,
                addRowPosition: 'last',
                exportButton: true
              }}
              
            />
          </ThemeProvider>
        </div>
        <p></p>
        <Button 
          variant="contained" 
          onClick={handleGuardarInformacion}>
            Guardar Cambios
        </Button>
      </>
    )
  }
 export default FuncionarioVisualFormato
