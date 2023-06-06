import { collection, addDoc, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewCampania, savingCampania, setAllCampanias } from "./campaniaSlice";
import Swal from 'sweetalert2';
import { loadCampanias } from "../../helpers/loadCampania";


export const startNewCampania = (nombreCampania, qSemana, qMensual) => {
  return async (dispatch, getState) => {
    dispatch(savingCampania());

    if (!nombreCampania) {
      // Manejar el caso cuando nombreCampania es undefined o vacío
      return;
    }

    const newCampania = {
      NombreCampania: nombreCampania,
      Q_semana: qSemana,
      Q_mes: qMensual
    };

    try {
      // Verificar si el nombre de la campaña ya existe en la base de datos
      const querySnapshot = await getDocs(collection(FirebaseDB, "campania"));

      
      const campania = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch(setAllCampanias(campania));

      const nombreExiste = campania.some(
        (campania) => campania.NombreCampania === nombreCampania
      );

      if (nombreExiste) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ya existe una campaña con ese nombre",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        });
        return;
      }

      // Guardar nueva campaña en Firestore
      const newDocRef = await addDoc(
        collection(FirebaseDB, "campania"),
        newCampania
      );

      // Agregar la ID de la nueva campaña al objeto
      newCampania.id = newDocRef.id;

      const updatedCampanias = campania;

      dispatch(setAllCampanias(updatedCampanias));

      await Swal.fire({
        icon: 'success',
        title: 'Campaña registrada',
        text: 'La campaña se registró correctamente en la base de datos.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });

      dispatch(addNewCampania(newCampania));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLoadingCampanias = () => {
  return async (dispatch) => {
    try {
      const campanias = await loadCampanias();
      dispatch(setAllCampanias(campanias));
    } catch (error) {
      console.error('Error al cargar las campañas:', error);
    }
  };
};
