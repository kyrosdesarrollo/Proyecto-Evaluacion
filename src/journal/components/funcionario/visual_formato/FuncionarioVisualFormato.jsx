import React,{useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import Swal from 'sweetalert2'
import { useDispatch, useSelector} from 'react-redux';
import { funcionarioStartNew } from '../../../../store/funcionario/thunks';

const FuncionarioVisualFormato = () => {
    const [open, setOpen] = useState(false); // Estado para controlar la apertura y cierre de la ventana de agregado
    const defaultMaterialTheme = createTheme();
    //Extrae los formatos desde Redux
    const { funcionario } = useSelector(state => state.funcionario);
    console.log(funcionario.length)
    let arregloFuncionarios;
    if (funcionario.length > 0) {
       arregloFuncionarios = funcionario[0].funcionarios.map((funcionario) => {
        return {
          Nombre: funcionario.Nombre,
          Correo: funcionario.Correo,
          Tipo: funcionario.Tipo,
          Activo: funcionario.Activo
        };
      });
    }
   
    
    const dispatch = useDispatch();
    let control = 1;


    useEffect(() => {
      console.log('Open:', open);
    }, [open, control]);
    
    
    const handleOpen = () => {
      console.log('open')
      setOpen(true);
      console.log(open)
    };

    const columns = [
      { title: 'Nombre', field: 'Nombre' },
      { title: 'Correo', field: 'Correo' },
      { title: 'Tipo',   field: 'Tipo',lookup: { 1: 'Monitor', 2: 'Encargado' }},
      { title: 'Activo', field: 'Activo',lookup: { 1: 'SI', 2: 'NO' }},
    ];
    //Estructura por si la dejan en Blanco solo habiliitar y comentar al de abajo
    const [data, setData] = useState([
      { Nombre: 'Juan Perez', Correo: 'juan.perez@2call.cl', Tipo: 1 , Activo: 1},
      { Nombre: 'Pedro Rojas', Correo: 'pedro.rojas@2call.cl', Tipo: 2 , Activo: 1},
      { Nombre: 'Diego Rojas', Correo: 'diego.rojas@2call.cl', Tipo: 2 , Activo: 1},
    ]);
    //const [data, setData] = useState(arregloFuncionarios);
    const handleGuardarInformacion = () => {
       console.log(data)
      if (open) {
        
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Debe cerrar la ventana de agregar/editar a nivel de registro.',
          showConfirmButton: false,
          timer: 1800
        })
        return
      }
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
          setOpen(false)
          Swal.fire(
            'Carga realizada !',
            'Se han actualizado los registros con éxito.',
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
                          // Validar que todos los campos estén llenos
                          if (!newData.Nombre || !newData.Correo || !newData.Tipo || !newData.Activo) {
                            reject();
                            return;
                          }
                          const updatedData = [...data, newData];
                          setData(updatedData);
                          resolve();
                        }, 1000);
                      }),
              
                      onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                        setTimeout(() => {
                          // Validar que todos los campos estén llenos
                          if (!newData.Nombre || !newData.Correo || !newData.Tipo || !newData.Activo) {
                            reject();
                            return;
                          }
                      
                          // Obtener el índice del registro a actualizar
                          const index = data.indexOf(oldData);
                      
                          // Actualizar el registro
                          const updatedData = [
                            ...data.slice(0, index),
                            { ...oldData, ...newData },
                            ...data.slice(index + 1)
                          ];
                      
                          // Actualizar el estado con los nuevos datos
                          setData(updatedData);
                      
                          resolve();
                        }, 1000);
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
             // actions={[    {      icon: 'add',      tooltip: 'Agregar funcionario',      isFreeAction: true,      onClick: () => setOpen(true),    },  ]}
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
           //handleOpen={handleOpen}
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
