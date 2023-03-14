import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadExcelPautas = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');
    console.log(uid);
    
    const cargaExcelPauta = collection(FirebaseDB,`/pauta/formato/W5wxfj50gjRUMPNf85nK04xOHmC2`);
    const docs = await getDocs(cargaExcelPauta);
    
    const pautas = [];
    docs.forEach(doc => {
     pautas.push({ id: doc.id, ...doc.data() });
        
    });
    // pautas.sort((a,b) => a.order - b.order); 
   
    return pautas;
    

}
