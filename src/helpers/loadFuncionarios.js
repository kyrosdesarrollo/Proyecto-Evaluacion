import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadFuncionario = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');    
    const docFuncionario = collection(FirebaseDB,`/maestros`); 
    const docs = await getDocs(docFuncionario);
    console.log(docs)
    
    const funcionario = [];
    docs.forEach(doc => {
     funcionario.push({ id: doc.id, ...doc.data() });
        
    });
    // pautas.sort((a,b) => a.order - b.order); 
    return funcionario;
    

}