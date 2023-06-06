import { collection, getDocs, deleteDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadCampanias = async () => {
  const campania = [];

  try {
    const querySnapshot = await getDocs(collection(FirebaseDB, "/campania"));

    querySnapshot.forEach((doc) => {
      campania.push({ id: doc.id, ...doc.data() });
    });

    // Ordena las campañas por algún criterio si es necesario
    // campanias.sort((a, b) => ...);
    
    return campania;
  } catch (error) {
    console.error("Error al cargar las campañas:", error);
    return [];
  }
};

export const deleteCompania = async (oldData, data, setData, dispatch) => {
  try {
    await deleteDoc(collection(FirebaseDB, "/campania", oldData.id));
    const newDataArray = data.filter((item) => item.id !== oldData.id);
    setData(newDataArray);
    dispatch(setAllCampanias(newDataArray));
  } catch (error) {
    console.error("Error al eliminar la campaña:", error);
  }
};
