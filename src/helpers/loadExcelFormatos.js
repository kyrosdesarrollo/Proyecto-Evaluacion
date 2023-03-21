import { collection, getDocs, where, query } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadExcelFormatos = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');

    const formatosQuery = collection(FirebaseDB,`/plantilla/excel/formato`);
    const q = query(formatosQuery, where("estado","==","Carga"));

    const obtenerFormato = await getDocs(q);
    const formatos = [];
    const jsonFormatos = JSON.stringify(formatos.map.detalle)

    obtenerFormato.forEach(doc => {
      formatos.push({ id: doc.id, ...doc.data() });
       });

       console.log(' ....... obtener formatos ......')
       console.log(obtenerFormato)
       console.log(' ....... formatos ......')
       console.log(formatos)

       console.log(' ....... jsonformatos ......')
       console.log(jsonFormatos) 
return formatos;
}
