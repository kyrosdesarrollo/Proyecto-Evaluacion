import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "@firebase/firestore/lite";
import { FirebaseDB, FirebaseAuth } from "../../firebase/config";
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import { addNewFuncionario, estadoFinalSaving, savingFuncionario, setActivaFuncionario } from "./funcionarioSlice";
import { format } from 'date-fns'
import { loadFuncionario } from "../../helpers/loadFuncionarios";
import { thunkmenu } from "../menu/thunksmenu";

function transformarCadena(cadena) {
    switch (cadena) {
      case '1':
        return 'MONITOR';
      case '2':
        return 'CALIDAD';
      case '3':
        return 'ADMINISTRADOR';
      case '4':
        return 'PLATAFORMA';
      default:
        return cadena;
    }
  }

export const funcionarioStartNew =( funcionario , perfil , activo)=>{
    return async (dispatch, getState) =>{
        console.log('Activo')
        console.log(activo)
        console.log('Perfil')
        console.log(perfil)
        dispatch(savingFuncionario());
        const { displayName } = getState().auth;        
        const funcionariosArreglo = [];
            for (let i = 0; i < funcionario.length; i++) {
                const { Nombre, Correo, Password, Tipo , Activo, Uid} = funcionario[i];
                const nuevoFuncionario = { Nombre, Correo,Password, Tipo, Activo, Uid };
                funcionariosArreglo.push(nuevoFuncionario);
            }
          

        try {

            //Proceso 1 Tipo cuando hay modificación de perfil 1: 'Monitor', 2: 'Calidad', 3: 'Administrador', 4: 'Plataforma'
             if (perfil.length > 0) {
                //Proceso 1.1 Actualizar Perfil en usuario
                let nombrePerfil = '';
                for (let i = 0; i < perfil.length; i++) {
                    const { Nombre, Correo,Tipo , Activo, Uid} = perfil[i];
                    console.log(Nombre)
                    nombrePerfil = transformarCadena(Tipo.toString())
                    console.log('Nombre Perfil')
                    console.log(nombrePerfil)
                    //Verificación de datos de usuario    
                    const verificaUser = collection(FirebaseDB, `${Uid}/evaluacion/usuario`);
                    const datoUser = await getDocs(verificaUser);
                    
                    datoUser.forEach(async (doc) => {
                        const docRef = doc.ref;
                        const data = doc.data();
                    
                        const updatedData = {
                        ...data,
                        perfil: nombrePerfil, // Aquí reemplaza 'ADMINISTRADOR' con el nuevo valor deseado
                        };
                    console.log(updatedData)
                        await updateDoc(docRef, updatedData);
                    });

                    //Proceso 1.2 Actualizar Perfil en menu
                                            //Ingreso de datos Menu, búsqueda de parametros de seleccion directo a FireBase
                    try{
                        // Paso 1 : Extraer los datos del Menu
                        const collectionRef = collection(FirebaseDB, 'menu/MyhIglVpgD6g2AkXQdxu/', nombrePerfil);
                        const docs = await getDocs(collectionRef);

                        // Paso 2: Eliminar los datos existentes
                        const verificaUser = collection(FirebaseDB, `${Uid}/evaluacion/menu`);
                        const datoUser = await getDocs(verificaUser);
                        datoUser.forEach(doc => {
                            deleteDoc(doc.ref);
                        });

                         //Paso 3 : Carga del Nuevo Menu
                        let newMenu = ''
                        docs.forEach(doc => {
                            newMenu = {
                                title: doc.data().title,
                                body:  doc.data().body,
                                date:  new Date().getTime(),
                                order: doc.data().order,
                            }
                                //Envio de Menu y Usuario para nueva carga
                                const retorno = thunkmenu(newMenu, Uid);
                            });
                        
                    
                        } catch (error) {
                            console.log('Problema actualizacion menu : '+ error)
                        }  

                }
            }
            //Proceso 2 Activo usuario que pasan de Activo Si / No
            if (activo.length > 0) {
                console.log('Viene informacion activo')
                for (let i = 0; i < activo.length; i++) {
                    const { Nombre, Activo, Uid, Correo} = activo[i];
                    console.log(Nombre)
                    //Activo 1: SI 2 : NO
                    console.log(Activo )

                    try {
                        const verificaUser = collection(FirebaseDB, `${Uid}/evaluacion/usuario`);
                        const datoUser = await getDocs(verificaUser);
                        let estadoUser = '';
                        if (Activo === '1') { estadoUser = 'Activo'} else{ estadoUser = 'Inactivo'}
                        console.log('Estado de usuario')
                        console.log(estadoUser)
                        datoUser.forEach(async (doc) => {
                            const docRef = doc.ref;
                            const data = doc.data();
                        
                            const updatedData = {
                            ...data,
                            estado: estadoUser, // Aquí reemplaza 'Estado' con el nuevo valor deseado Activo / Inactivo
                            };
                        console.log(updatedData)
                            await updateDoc(docRef, updatedData);
                        });
                        
                    } catch (error) {
                        console.log('Problema actualizacion Activo : '+ error)
                    }
                    
                    
                }
             }
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

export const funcionarioActivated =( funcionario )=>{
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