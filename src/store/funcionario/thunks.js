import { collection, doc, setDoc, getDoc } from "@firebase/firestore/lite";
import { FirebaseDB, FirebaseAuth } from "../../firebase/config";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { addNewFuncionario, estadoFinalSaving, savingFuncionario, setActivaFuncionario } from "./funcionarioSlice";
import { format } from 'date-fns'
import { loadFuncionario } from "../../helpers/loadFuncionarios";

export const funcionarioStartNew =( funcionario )=>{
    return async (dispatch, getState) =>{
        dispatch(savingFuncionario());
        const { displayName } = getState().auth;        
        const funcionariosArreglo = [];
            for (let i = 0; i < funcionario.length; i++) {
                const { Nombre, Correo, Password, Tipo , Activo, Uid} = funcionario[i];
                const nuevoFuncionario = { Nombre, Correo,Password, Tipo, Activo, Uid };
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
export const funcionarioStartNewRegister =( todo , displayName)=>{
    return async (dispatch, getState) =>{
        dispatch(savingFuncionario());    

        
        console.log('Inicio Funcionario funcionarioStartNewRegister')
        console.log(todo)
        
        try {
            //Ruta de ingreso de datos de funcionario Nota: ,'funcionario' estoy dando el nombre al documento
            const docRef = doc(collection(FirebaseDB, "/maestros"), "funcionario");
            const docSnap = await getDoc(docRef);
        
                // Si el documento no existe, crearlo con los nuevos datos
                const newFuncionario = {
                    nombreCreador :displayName,
                    funcionarios: todo,
                    fechaIngreso: format(new Date(), 'dd/MM/yyyy HH:mm:ss '),
                    status: 'Activo',
                }
                await setDoc(docRef, newFuncionario);
                dispatch(addNewFuncionario(newFuncionario));
                dispatch(setActivaFuncionario(newFuncionario));
            
            
        } catch (error) {
            console.log(error)
        }
        //Cambia de estado el saving a false
        dispatch( estadoFinalSaving());
       
    }
}
export const startLoadingFuncionarios = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const funcionario = await loadFuncionario (uid);
        dispatch(setActivaFuncionario(funcionario));
        
    }
}

export const funcionarioReset =( funcionario )=>{
    return async (dispatch, getState) =>{
        dispatch(savingFuncionario());
       // Obtener la instancia del servicio de autenticación
        const auth = FirebaseAuth;
        try {
            for (let i = 0; i < funcionario.length; i++) {
                const {  Correo } = funcionario[i];
               sendPasswordResetEmail(auth, Correo)
               .then(() => {
                 console.log("Se ha enviado un correo para restablecer la contraseña");
               })
               .catch((error) => {
                 console.log("Error al enviar el correo de restablecimiento de contraseña:", error);
               });
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
