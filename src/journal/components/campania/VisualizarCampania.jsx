import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { Grid, ThemeProvider, createTheme,Button } from '@mui/material';
import { setAllCampanias } from '../../../store/campania/campaniaSlice';
import { loadCampanias} from '../../../helpers/loadCampania';

const VisualizarCampania = () => {
  const defaultMaterialTheme = createTheme();

  const columnas = [
    { title: 'Nombre Campania', field: 'NombreCampania' },
    { title: 'Q Semana', field: 'Q_semana' },
    { title: 'Q Mes', field: 'Q_mes' },
    // Agrega más columnas aquí según tus datos de la tabla "campania"
  ];
  

  const dispatch = useDispatch();
  const {campania}  = useSelector(state => state.campania || {});
      
   let  arregloCampania = campania.map((dato) => {
  
   return {
     NombreCampania: dato.NombreCampania,
    Q_semana: dato.Q_semana,
    Q_mes: dato.Q_mes,
    };
  });
 


  useEffect(() => {
    const fetchCampanias = async () => {
      try {
        let data = await loadCampanias(); 
        dispatch(setAllCampanias(data));
        
      } catch (error) {
        console.error('Error al cargar las campañas:', error);
      }
    };

    fetchCampanias();
  }, [dispatch]);


  const handleRowUpdate = async (newData, oldData) => {
    try {
      const updatedData = await updateCampania(newData); // Assuming updateCampania is a function that updates the campaign in Firebase
      const newDataArray = [...data];
      const index = newDataArray.indexOf(oldData);
      newDataArray[index] = updatedData;

      
      setData(newDataArray);
      dispatch(setAllCampanias(newDataArray));
    } catch (error) {
      console.error('Error al actualizar la campaña:', error);
    }
  };

  const handleRowDelete = async (oldData) => {
    try {
      await deleteCompania(oldData.id); // Suponiendo que deleteCampania es una función que elimina la campaña en Firebase
      const newDataArray = [...data];
      const index = newDataArray.indexOf(oldData);
      newDataArray.splice(index, 1);
      setData(newDataArray);
      dispatch(setAllCampanias(newDataArray));
    } catch (error) {
      console.error('Error al eliminar la campaña:', error);
    }
  };

  const handleGuardarInformacion = ()=>{
    console.log("VOy guardando",data)

  }

  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Grid>
        <MaterialTable

          title="Visualizar Campañas"
          columns={columnas}
          data={arregloCampania}
          editable={{
          onRowUpdate: handleRowUpdate//,
          //onRowDelete: handleRowDelete,
          }}          
          options={{
            editing: true,
            grouping: true,
            columnsButton: true,
            filtering: true,
            pageSizeOptions: [5, 10, 20],
            pageSize: 5,
            paginationType: 'stepped',
            rowStyle: {
              fontSize: 15,
            },
          }}
         />
       </Grid>
      </ThemeProvider>
      <div></div>
      <p></p>
     </>
  );
};

export default VisualizarCampania;
