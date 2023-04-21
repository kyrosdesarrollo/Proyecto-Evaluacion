import { collection, doc, setDoc, deleteDoc,getDocs, where, query,updateDoc,getDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { actualizarFormato, addNewEmptyExcelFormato, deleteFormatoById, savingNewExcelFormato, setFormatos } from "./formatoSlice";
import { format } from 'date-fns'

export const startNewExcelFormato =( lista , listaJson, formato )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingNewExcelFormato());
        const { uid, displayName } = getSate().auth;
        //uid este lo genera solo firebase database
        //Estructrura de información
        const newObject = Object.assign({}, lista);
        const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss ')
        const head = lista[0];
        // console.log(newArreglo)
        const newExcel = {
            idusuario: uid ,
            nombre :displayName,
            body:'Ingreso de formato',
            formato: formato,
            date: date,
            detalle : newObject,
            detalleJson: listaJson,
            cabezaJson: head,
            estado: 'Carga',
        }
        try {
            const newDoc = doc (collection(FirebaseDB,  `/plantilla/excel/formato`));
            await setDoc(newDoc, newExcel);
            newExcel.id = newDoc.id;
            //Dispatch
            dispatch(addNewEmptyExcelFormato(newExcel));
            
        } catch (error) {
            console.log(error)
        }
       
    }
}
export const startLoadingFormatos = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
       
        const formatos = await loadExcelFormatos (uid);
        dispatch(setFormatos(formatos));
    }
}
export const startDeleteFormato = (id = '')=>{

    return async(dispatch, getState) =>{
        dispatch(savingNewExcelFormato());
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        console.log('Estoy en eliminar viene con ID de fire')
        console.log(id)

        try {

        const docRef = doc(FirebaseDB, `/plantilla/excel/formato/${ id }` );
        await deleteDoc (docRef, {merge: true})
            
        } catch (error) {
            console.log(error)
        }
        
        
        dispatch( deleteFormatoById());
    }
}
export const startUpdateFormato = (arreglo, id = '', tipo = '')=>{

    return async(dispatch, getState) =>{
        //Deja estado saving en true
        console.log('Arreglo en update');
        console.log(arreglo);
        console.log('Arreglo en Tipo');
        console.log(tipo);
    
        dispatch(savingNewExcelFormato());
        const { uid, displayName } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        try {
            const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss ')
            const documento = doc(FirebaseDB, `/plantilla/excel/formato/${ id }`);
            console.log(documento)
            await updateDoc(documento, {
                usuarioActualizador: displayName,
                fechaActualizacion: date,
                detalleJson: arreglo});
        } catch (error) {
            console.log(error)
        }
        
        //Descarga de formatos actualizados
        dispatch(startLoadingFormatos());
         //Cambia de estado el saving a false
        dispatch( deleteFormatoById());
    }
}


export const startUpdateFormatoRespuesta = (id = '', respuestas = '', proceso = '') => {
    return async (dispatch, getState) => {
      console.log('Estoy en startUpdateFormatoRespuesta')
      console.log(id)
      console.log(proceso)
      console.log(respuestas)
        //Extraer la información para ser procesa y enviada a FireBase
        let respuestasAux = [];
        respuestas[0].forEach(objeto => {
                const bloque = objeto["BLOQUES DE EVALUACIÓN"];
                const categoria = objeto["CATEGORÍA"];
                const pregunta = objeto["CONDUCTA"];
                const cumplimientoBloque = objeto["CUMPLIMIENTO POR BLOQUES"];
                const cumplimientoPregunta = objeto["CUMPLIMIENTO POR CATEGORIA"];
                const respuesta = objeto["respuesta"];
        respuestasAux.push({bloque,categoria, pregunta,respuesta,cumplimientoPregunta,cumplimientoBloque} );
        });

        console.log('respuestas1:');
        console.log(respuestasAux);


      const ruta = "plantilla/excel/formato/8Ene8CKMDmZw5RZJ4rAQ";
      const detalleJsonIndex = 0; // Índice del elemento en la matriz detalleJson que quieres actualizar
      const respuesta1 = {
            pregunta: 'te gustas',
            respuesta: 'Si'
            };
      
      try {
        const plantillaRef = doc(FirebaseDB, ruta);
        const plantillaSnapshot = await getDoc(plantillaRef);
      
        if (plantillaSnapshot.exists()) {
          // Obtener la matriz detalleJson
          const detalleJsonArray = plantillaSnapshot.get("detalleJson");
      
          // Verificar que el índice que se desea actualizar existe en la matriz
          if (detalleJsonIndex >= detalleJsonArray.length) {
            console.log(`El índice ${detalleJsonIndex} no existe en la matriz detalleJson`);
            return;
          }
      
          if (detalleJsonArray[detalleJsonIndex].hasOwnProperty('respuestas')) {
            detalleJsonArray[detalleJsonIndex].respuestas = respuestasAux;
          } else {
            detalleJsonArray[detalleJsonIndex].respuestas = [respuestasAux];
          }
          // Establecer el campo "respuestas" en el objeto que se está actualizando
          //detalleJsonArray[detalleJsonIndex].respuestas = [primerObjeto];
      
          // Actualizar la matriz detalleJson en la base de datos
          await updateDoc(plantillaRef, { detalleJson: detalleJsonArray }, { merge: true });
          
          console.log("Campo respuesta agregado con éxito");
        } else {
          console.log("El documento no existe");
        }
      } catch (error) {
        console.log("Error al agregar campo respuesta:", error);
      }
      

    }
 };

// export const startUpdateFormatoRespuesta = (id = '', respuestas = '', proceso = '') => {
//     return async (dispatch, getState) => {
//       console.log('Estoy en startUpdateFormatoRespuesta')
//       console.log(id)
//       console.log(proceso)
//       console.log(respuestas)

//       let respuestas1 = [];

//         respuestas[0].forEach(objeto => {

//         const bloque = objeto["BLOQUES DE EVALUACIÓN"];
//         const categoria = objeto["CATEGORÍA"];
//         const pregunta = objeto["CONDUCTA"];
//         const cumplimientoBloque = objeto["CUMPLIMIENTO POR BLOQUES"];
//         const cumplimientoPregunta = objeto["CUMPLIMIENTO POR CATEGORIA"];
//         const respuesta = objeto["respuesta"];

//         respuestas1.push({ bloque,categoria, pregunta,respuesta,cumplimientoPregunta,cumplimientoBloque });
//         });

//         console.log('respuestas1:');
//         console.log(respuestas1);


//       const ruta = `plantilla/excel/formato/${ id }`;
//       const detalleJsonIndex = 0; // Índice del elemento en la matriz detalleJson que quieres actualizar
      
//       try {
//         const plantillaRef = doc(FirebaseDB, ruta);
//         const plantillaSnapshot = await getDoc(plantillaRef);
      
//         if (plantillaSnapshot.exists()) {
//           // Obtener la matriz detalleJson
//           const detalleJsonArray = plantillaSnapshot.get("detalleJson");
      
//         //   // Verificar que el índice que se desea actualizar existe en la matriz
//         //   if (detalleJsonIndex >= detalleJsonArray.length) {
//         //     console.log(`El índice ${detalleJsonIndex} no existe en la matriz detalleJson`);
//         //     return;
//         //   }
      
//           if (detalleJsonArray[detalleJsonIndex].hasOwnProperty('respuestas')) {
//             detalleJsonArray[detalleJsonIndex].respuestas = respuestas1;
//           } else {
//             detalleJsonArray[detalleJsonIndex].respuestas = [respuestas1];
//           }
//           // Establecer el campo "respuestas" en el objeto que se está actualizando
//           //detalleJsonArray[detalleJsonIndex].respuestas = [primerObjeto];
      
//           // Actualizar la matriz detalleJson en la base de datos
//           await updateDoc(plantillaRef, { detalleJson: detalleJsonArray }, { merge: true });
//           console.log("Campo respuesta agregado con éxito");
//         } else {
//           console.log("El documento no existe");
//         }
//       } catch (error) {
//         console.log("Error al agregar campo respuesta:", error);
//       }
      
//     //   const ruta = `/plantilla/excel/formato/8Ene8CKMDmZw5RZJ4rAQ/detalleJson/1`;
      
//     //     console.log(ruta)
//     //     const respuesta = {
//     //     pregunta: 'te gustas',
//     //     respuesta: 'Si'
//     //     };

//     //     try {
//     //     const detalleRef = doc(FirebaseDB, ruta);
//     //     await setDoc (detalleRef, respuesta, {merge: true})
        
//     //     const detalleSnapshot = await getDoc(detalleRef);
//     //     console.log(detalleSnapshot)
//     //     if (detalleSnapshot.exists()) {
//     //         // El documento existe, puedes actualizarlo
//     //         await updateDoc(detalleRef, {
//     //         respuestas: [respuesta]
//     //         }, { merge: true });
//     //         console.log("Respuesta agregada con éxito");
//     //     } else {
//     //         console.log("El documento no existe");
//     //     }
//     //     } catch (error) {
//     //     console.log("Error al agregar respuesta:", error);
//     //     }

//             }
//         };

// export const startUpdateFormatoRespuesta = (id = '', respuestas = '', proceso = '') => {
//     return async (dispatch, getState) => {
//       console.log('Estoy en startUpdateFormatoRespuesta');
//       console.log(id);
//       console.log(proceso);
//       console.log(respuestas);
  
//       const ruta = `/plantilla/excel/formato/${id}`;
//       const detalleRef = doc(FirebaseDB, ruta);
//       console.log(ruta);
//       console.log(detalleRef);
      
//       respuestas.forEach(async (detalle, index) => {
//         const respuestas = detalle.respuestas;
//         if (respuestas.length > 0) {
//           const detalleSnapshot = await detalleRef.get();
//           const detalleData = detalleSnapshot.data();
//           const detalleJson = detalleData.detalleJson;
//           const detalleIndex = detalleJson[index];
//           await updateDoc(detalleRef, {
//             detalleJson: detalleJson.map((item, i) => {
//               if (i === index) {
//                 return {
//                   ...item,
//                   respuestas: arrayUnion(...respuestas),
//                 };
//               } else {
//                 return item;
//               }
//             }),
//           });
//         }
//       });
//     };
//   };
// export const startUpdateFormatoRespuesta = (id = '', respuestas = '', proceso = '') => {
//     return async (dispatch, getState) => {
//       console.log('Estoy en startUpdateFormatoRespuesta')
//       console.log(id)
//       console.log(proceso)
//       console.log(respuestas)
  
//       const ruta = `/plantilla/excel/formato/${id}/detalleJson`;
  
//       console.log(ruta)
  
//       respuestas.forEach(async (detalle, index) => {
//         const respuestas = detalle.respuestas;
//         console.log(index)
//         console.log(respuestas)
//           const detalleRef = doc(FirebaseDB, ruta, `${index}`);
//           await updateDoc(detalleRef, {
//             respuestas: respuestas
//           });
        
//       })
//     }
//   }
// export const startUpdateFormatoRespuesta = (id = '', respuestas = '', proceso = '') => {
//     return async (dispatch, getState) => {
//       console.log('Estoy en startUpdateFormatoRespuesta')
//       console.log(id)
//       console.log(proceso)
//       console.log(respuestas)
  
//       const ruta = `/plantilla/excel/formato/${id}`;
//       const detalleRef = doc(FirebaseDB, ruta);
//       console.log(ruta)
//       console.log(detalleRef)
//       respuestas.forEach(async (detalle, index) => {
//         const respuestas = detalle.respuestas;
//         if (respuestas.length > 0) {
//           const detalleSnapshot = await getDocs(collection(detalleRef, "detalleJson"));
//           const detalleDoc = detalleSnapshot.docs[index];
//           console.log(detalleDoc)
//           for (let i = 0; i < respuestas.length; i++) {
//             const respuesta = respuestas[i];
//             await updateDoc(detalleDoc.ref, {
//               [`respuestas.${i}`]: respuesta
//             });
//           }
//         }
//       })
//     }
//   };
  