import { collection, doc, setDoc, getDoc , deleteDoc} from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewFuncionario, estadoFinalSaving, savingFuncionario, setActivaFuncionario } from "./funcionarioSlice";
import { format } from 'date-fns'
import { loadFuncionario } from "../../helpers/loadFuncionarios";

export const funcionarioStartNew =( funcionario )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingFuncionario());
        const { displayName } = getSate().auth;
        const funcionariosArreglo = [];
            for (let i = 0; i < funcionario.length; i++) {
                const { Nombre, Correo, Contrasena, Tipo , Activo} = funcionario[i];
                const nuevoFuncionario = { Nombre, Correo,Contrasena, Tipo, Activo };
                funcionariosArreglo.push(nuevoFuncionario);
            }
          

        try {
            //Ruta de ingreso de datos de funcionario Nota: ,'funcionario' estoy dando el nombre al documento
            const docRef = doc(collection(FirebaseDB, "/maestros"), "funcionario");
            const docSnap = await getDoc(docRef);
        

            if (docSnap.exists()) {
                const oldFuncionario = {
                    nombreActualizador :displayName,
                    funcionarios: funcionariosArreglo,
                    fechaActualizacion: format(new Date(), 'dd/MM/yyyy HH:mm:ss '),
                    status: 'Activo',
                }
                //await deleteDoc(docRef);

                console.log('Lo que que se cargara Update')
                console.log(oldFuncionario)
                // Si el documento ya existe, actualizar los datos
                await setDoc(docRef, oldFuncionario);
               // dispatch(addNewFuncionario(oldFuncionario));
                dispatch(setActivaFuncionario(oldFuncionario));
                
            } else {
                // Si el documento no existe, crearlo con los nuevos datos
                const newFuncionario = {
                    nombreCreador :displayName,
                    funcionarios: funcionariosArreglo,
                    fechaIngreso: format(new Date(), 'dd/MM/yyyy HH:mm:ss '),
                    status: 'Activo',
                }
                await setDoc(docRef, newFuncionario);
                dispatch(addNewFuncionario(newFuncionario));
                dispatch(setActivaFuncionario(newFuncionario));
            }
            
        } catch (error) {
            console.log(error)
        }
        //Cambia de estado el saving a false
        dispatch( estadoFinalSaving());
       
       
        // dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}
export const startLoadingFuncionarios = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const funcionario = await loadFuncionario (uid);
        console.log(funcionario)
       dispatch(setActivaFuncionario(funcionario));
        
    }
}
