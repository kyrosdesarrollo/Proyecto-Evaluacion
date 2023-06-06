import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Button, Grid } from '@mui/material';
import { useDispatch} from 'react-redux';
import { setAllCampanias } from '../../../store/campania/campaniaSlice';

let verTodo = setAllCampanias;
const CampaniaCrud = () => {
    const defaultMaterialTheme = createTheme();
    const dispatch = useDispatch();
    const [data, setData] = useState(verTodo);
    const handleGuardarInformacion = () => {
    
      const columns = [
        {
          title: 'Nombre de Campaña',
          field: 'nombreCampania',
        },
        {
          title: 'Q. Semana',
          field: 'qSemana',
          type: 'numeric',
        },
        {
          title: 'Q. Mensual',
          field: 'qMensual',
          type: 'numeric',
        },
      ];
      
              
    return (
      <>
        <div style={{ width: '110%', height: '120%' }}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Ver Campañas"
              columns={columns}
              data={data}
              editable={{
                      onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          // Validar que todos los campos estén llenos
                          if (!newData.nombreCampania || !newData.qSemana || !newData.qMensual ) {
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
                          if (!newData.nombreCampania || !newData.qSemana || !newData.qMensual ) {
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
                      
                          }}
             
              options={{
                selection:true,
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
        
        <Grid container spacing={6}>
            <Grid item xs={3} md={2}>
            <Button 
                    variant="contained" 
                    onClick={handleGuardarInformacion}>
                      Guardar Cambios
                  </Button>
            </Grid>
            <Grid item xs={3} md={2}>
                <Button 
                    color="error"
                    variant="contained" 
                    onClick={handleGuardarInformacion}>
                      Eliminar Campaña
                  </Button>
            </Grid>
         </Grid>
      </>
    )
  }
}
 export default CampaniaCrud;
