import { collection, getDocs, where, query } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadExcelFormatos = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');

    const formatosQuery = collection(FirebaseDB,`/plantilla/excel/formato`);
    const q = query(formatosQuery, where("estado","==","Carga"));

    const obtenerFormato = await getDocs(q);
    const formatos = [];
    obtenerFormato.forEach(doc => {
      formatos.push({ id: doc.id, ...doc.data() });
       });
       console.log(' ....... NELSON ......')
       console.log(obtenerFormato)
       console.log(formatos)
return formatos;
}
