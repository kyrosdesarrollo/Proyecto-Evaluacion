import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2'
import { useDispatch, useSelector} from 'react-redux';
import { funcionarioStartNew } from '../../../../store/funcionario/thunks';
import { startCreateUsers } from '../../../../store/auth/thunks';

const UsuarioVisualFormato = () => {
    const defaultMaterialTheme = createTheme();
    const dispatch = useDispatch();
    //Extrae los formatos desde Redux
    const { funcionario } = useSelector(state => state.funcionario);
    let arregloFuncionarios;
    if (funcionario.length > 0) {
       arregloFuncionarios = funcionario[0].funcionarios.map((funcionario) => {
        return {
          Nombre: funcionario.Nombre,
          Correo: funcionario.Correo,
          Password: funcionario.Password,
          Tipo: funcionario.Tipo,
          Activo: funcionario.Activo
        };
      });
    }else{ //Esto sirve cuando no viene el indice 0
      arregloFuncionarios = funcionario.funcionarios.map((funcionario) => {
        return {
          Nombre: funcionario.Nombre,
          Correo: funcionario.Correo,
          Password: funcionario.Password,
          Tipo: funcionario.Tipo,
          Activo: funcionario.Activo
        };
      });
    }
   
    


    const columns = [
      { title: 'Nombre', field: 'Nombre' },
      { title: 'Correo', field: 'Correo' },
      { title: 'Password', field: 'Password', render: rowData => (
        <div>{rowData.Password ? '*'.repeat(rowData.Password.length) : ''}</div>
      ), editComponent: props => (
        <TextField
          type="password"
          value={props.value || ''}
          onChange={e => props.onChange(e.target.value)}
        />
      ),},
      { title: 'Tipo',   field: 'Tipo',lookup: { 1: 'Monitor', 2: 'Calidad', 3: 'Administrador', 4: 'Plataforma' }},
      { title: 'Activo', field: 'Activo',lookup: { 1: 'SI', 2: 'NO' }},
    ];
    //Estructura por si la dejan en Blanco solo habilitar y comentar al de abajo
    // const [data, setData] = useState([
    //   { Nombre: 'Juan Perez', Correo: 'juan.perez@2call.cl', Tipo: 1 , Activo: 1},
    //   { Nombre: 'Pedro Rojas', Correo: 'pedro.rojas@2call.cl', Tipo: 2 , Activo: 1},
    //   { Nombre: 'Diego Rojas', Correo: 'diego.rojas@2call.cl', Tipo: 2 , Activo: 1},
    // ]);
    const [data, setData] = useState(arregloFuncionarios);
    //Verificación de usuarios nuevos para creación
    let usuariosRegistrados;
    if (funcionario.length > 0) {
     usuariosRegistrados = funcionario[0].funcionarios;
    }
    else{
      usuariosRegistrados = funcionario.funcionarios;
    }
    const nuevosFuncionarios = [];

       for (let i = 0; i < data.length; i++) {
         const funcionario = data[i];
         let encontrado = false;
         for (let j = 0; j < usuariosRegistrados.length; j++) {
           const f = usuariosRegistrados[j];
           if (f.Correo === funcionario.Correo) {
             encontrado = true;
             break;
           }
         }
         if (!encontrado) {
           nuevosFuncionarios.push(funcionario);
         }
       }
    const handleGuardarInformacion = () => {
       console.log(data)
      // if (open) {
        
      //   Swal.fire({
      //     position: 'top-center',
      //     icon: 'error',
      //     title: 'Debe cerrar la ventana de agregar/editar a nivel de registro.',
      //     showConfirmButton: false,
      //     timer: 1800
      //   })
      //   return
      // }
      Swal.fire({
        title: 'Funcionario',
        text: "¿ Estas seguro de actualizar información ?, recordar verificar si ventana de registro o edición se encuentra abierta.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Aqui esta para dispacth')
          console.log(data)
          dispatch(funcionarioStartNew(data));
          //Creación de usuario nuevos en Firebase solo con correo nuevo
          if (nuevosFuncionarios.length > 0 ) {

            console.log('Creación de usuario')
            console.log(nuevosFuncionarios)
            for (let i = 0; i < nuevosFuncionarios.length; i++) {
              dispatch( startCreateUsers(nuevosFuncionarios[i]));
            }
            
          }


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
              title="Configuración de Usuarios"
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
                           // Validar formato de correo electrónico
                          const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                          if (!newData.Correo.match(emailFormat)) {
                            alert("El formato de correo electrónico es incorrecto, favor corregir");
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
                           // Validar formato de correo electrónico
                           const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                           if (!newData.Correo.match(emailFormat)) {
                             alert("El formato de correo electrónico es incorrecto, favor corregir");
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
 export default UsuarioVisualFormato
