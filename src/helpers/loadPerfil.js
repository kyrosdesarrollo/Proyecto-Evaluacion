
import { collection, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadPerfil = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');
        
        const cargaPerfil = collection(FirebaseDB,`${ uid }/evaluacion/usuario`);
        const extraePerfil = await getDocs(cargaPerfil);
       //Extraer perfil de Usuario
        let perfil = [];
        extraePerfil.forEach(doc => {
            perfil.push({ id: doc.id, ...doc.data() });
        });
        if (perfil.length === 0) {
           return
          }
       
    return perfil[0].perfil ;

}
export const loadActivo = async ( uid = '') => {
    //Si queremos podemos omitir esta validación
    if(!uid) throw new Error('El UID del usuario no existe');
        
        const cargaPerfil = collection(FirebaseDB,`${ uid }/evaluacion/usuario`);
        const extraePerfil = await getDocs(cargaPerfil);
       //Extraer perfil de Usuario
        let perfil = [];
        extraePerfil.forEach(doc => {
            perfil.push({ id: doc.id, ...doc.data() });
        });
        if (perfil.length === 0) {
           return
          }
       
    return perfil[0].estado ;

}


