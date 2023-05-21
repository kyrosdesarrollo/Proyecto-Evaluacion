import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button, Grid } from '@mui/material';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2'
import { useDispatch, useSelector} from 'react-redux';
import { funcionarioReset, funcionarioStartNew } from '../../../../store/funcionario/thunks';

const FuncionarioVisualFormato = () => {
    const defaultMaterialTheme = createTheme();
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = useState([]);
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
          Activo: funcionario.Activo,
          Uid: funcionario.Uid,
        };
      });
    }else{ //Esto sirve cuando no viene el indice 0
      arregloFuncionarios = funcionario.funcionarios.map((funcionario) => {
        return {
          Nombre: funcionario.Nombre,
          Correo: funcionario.Correo,
          Password: funcionario.Password,
          Tipo: funcionario.Tipo,
          Activo: funcionario.Activo,
          Uid: funcionario.Uid,
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
      { title: 'Uid', field: 'Uid' },
    ];
    //Estructura por si la dejan en Blanco solo habilitar y comentar al de abajo
    // const [data, setData] = useState([
    //   { Nombre: 'Juan Perez', Correo: 'juan.perez@2call.cl', Tipo: 1 , Activo: 1},
    //   { Nombre: 'Pedro Rojas', Correo: 'pedro.rojas@2call.cl', Tipo: 2 , Activo: 1},
    //   { Nombre: 'Diego Rojas', Correo: 'diego.rojas@2call.cl', Tipo: 2 , Activo: 1},
    // ]);
    const [data, setData] = useState(arregloFuncionarios);
    
    const handleGuardarInformacion = () => {

      const modificacionPerfil = [];
      const modificacionActivo = [];

      // Comprobar si hay modificaciones en el campo "Tipo" y agregar registros a los arreglos correspondientes
      for (let i = 0; i < funcionario[0]?.funcionarios?.length; i++) {
        const original = funcionario[0]?.funcionarios[i];
        const modificado = data[i];

        if (original.Tipo !== modificado.Tipo) {
          modificacionPerfil.push(modificado);
        }

        if (original.Activo !== modificado.Activo) {
          modificacionActivo.push(modificado);
        }
      }


      console.log('Registros modificados:', modificacionPerfil);
      console.log('Registros activos:', modificacionActivo);
      //Control si no hay registros actualizados
      if (modificacionPerfil.length === 0 && modificacionActivo.length === 0) {
        // Lógica para guardar los datos
        const duracion = 9000; // Duración total del proceso en milisegundos
        const intervalo = 100; // Intervalo de actualización del porcentaje en milisegundos
        const porcentajeIncremento = 10; // Porcentaje de incremento en cada intervalo
        let porcentaje = 0;
      
        Swal.fire({
          title: 'Actualización...',
          html: 'Buscando datos para actualizar, hasta el momento no se ha detectado cambios ...... 0%',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
      
            const popup = Swal.getPopup();
            const htmlContainer = popup.querySelector('.swal2-html-container');
      
            const interval = setInterval(() => {
              porcentaje += porcentajeIncremento;
              htmlContainer.innerHTML = `Buscando datos para actualizar, hasta el momento no se ha detectado cambios ...... ${porcentaje}%`;
      
              if (porcentaje >= 100) {
                clearInterval(interval);
                setSelectedRows([]);
                Swal.close();
              }
            }, intervalo);
          }
        });
      
        setTimeout(() => {
          Swal.close();
        }, duracion);
      
        return;
      }
      
      
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
          console.log('Aqui esta para dispact')
          console.log(data)
          dispatch(funcionarioStartNew(data,modificacionPerfil,modificacionActivo));
          // Lógica para guardar los datos
              Swal.fire({
                title: 'Actualizando datos...',
                html: 'Espere un momento por favor',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                }
              });
              setTimeout(() => {
                setSelectedRows([]);
                Swal.close();
              }, 10000);
                    }
      })

    };
     //Captura la información seleccionad de data para eliminación
     const handleSelectionChange = (rows) => {
      setSelectedRows([...rows]); // Copia los registros seleccionados en un nuevo array
      //props.updateSelectRowValue(rows);
    }

     //Resetear contraseñas
     const handleReset = ()  =>{

      if (selectedRows.length >0) {
        Swal.fire({
          title: 'Funcionario',
          text: "¿ Estas seguro de resetear contraseña para estos Usuarios ?.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si estoy seguro!'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(funcionarioReset(selectedRows));
            Swal.fire(
              'Correo !!!',
              'Se han enviado enlace(s) para que los usuario(s) puedan resetear su contraseña.',
              'success'
            )
          }
        })
        setSelectedRows([]);
      }else {
        // la fila no está seleccionada, no hacer nada
        Swal.fire({
          confirmButtonColor: '#2196f3',
          icon: 'error',
          title: 'Selección de registro',
          text: 'Favor de seleccionar registro para realizar reseteo de contraseña.',
        });
         return
      }
      
     }
              
    return (
      <>
        <div style={{ width: '115%', height: '100%' }}>
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
                            // Validar que no se actualice en las columnas "Nombre", "Correo" y "Uid"
                            if (oldData.Nombre !== newData.Nombre || oldData.Correo !== newData.Correo || oldData.Uid !== newData.Uid) {
                              alert("No se permite actualizar los campos Nombre, Correo o Uid");
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
                      
                // onRowDelete: oldData =>
                //   new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       const updatedData = [...data];
                //       updatedData.splice(updatedData.indexOf(oldData), 1);
                //       setData(updatedData);
                //       resolve();
                //     }, 1000)
                //   }),
              }}
             // actions={[    {      icon: 'add',      tooltip: 'Agregar funcionario',      isFreeAction: true,      onClick: () => setOpen(true),    },  ]}
             onSelectionChange={handleSelectionChange}       
             options={{
                selection:true,
                initialSelectedRowIds: [],
                grouping: true,
                columnsButton: true,
                filtering: true,
                //actionsColumnIndex: -1,
                addRowPosition: 'last',
                exportButton: true,
              }}
           //handleOpen={handleOpen}
            />
          </ThemeProvider>
        </div>
        <p></p>
       
        <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button 
                size='large'
                variant="contained" 
                onClick={handleGuardarInformacion}>
                  Guardar
              </Button>
            </Grid>
           
            <Grid item xs={3}>
              <Button 
                size='large'
                color='success'
                variant="contained" 
                onClick={handleReset}>
                  Resetear 
              </Button>
            </Grid>
        </Grid>
      </>
    )
  }
 export default FuncionarioVisualFormato
