import { collection, doc, setDoc, deleteDoc,getDocs, where, query ,updateDoc,getDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { actualizarFormato, addNewEmptyExcelFormato, deleteFormatoById, savingNewExcelFormato, setFormatos } from "./formatoSlice";
import { format } from 'date-fns'
import { RepeatRounded } from "@mui/icons-material";

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


    const ruta = `plantilla/excel/formato/${ id }`;
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
    
        // if (detalleJsonArray[detalleJsonIndex].hasOwnProperty('respuestas')) {
        //   detalleJsonArray[detalleJsonIndex].respuestas = respuestasAux;
        // } else {
        //   detalleJsonArray[detalleJsonIndex].respuestas = [respuestasAux];
        // }
        // Establecer el campo "respuestas" en el objeto que se está actualizando
        //detalleJsonArray[detalleJsonIndex].respuestas = [primerObjeto];
        // Obtener el objeto en el índice especificado
          const detalleJsonObject = detalleJsonArray[detalleJsonIndex];

          // Agregar respuestas al objeto
          detalleJsonObject.respuestas = respuestasAux;

          // Actualizar campo estado en el objeto
          detalleJsonObject.Estado = 'Cierre';
    
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

// **** VALIDAR PROCESO DE ACTUALIZACION ******
export const actualizarDocumentos = (id = '', respuestas = '') => {
  return async (dispatch, getState) => {

    //Id es el código del documento Frebase ejemplo 3edatrtrw65f
    const ruta = `plantilla/excel/formato/${ id }`;
    try {
      //Realiza conexión con ruta y extracción de documentos
      const plantillaRef = doc(FirebaseDB, ruta);
      const plantillaSnapshot = await getDoc(plantillaRef);
    
      if (plantillaSnapshot.exists()) {
        // Obtener la matriz detalleJson de todo el documento o archivo
        const detalleJsonArray = plantillaSnapshot.get("detalleJson");    

        //Extrae id y las respuestas
        const idsRespuestas = respuestas.map((respuesta) => {
          return {
            id: respuesta.id - 1,
            respuestas: respuesta.respuestas
          };
        });
        // Recorrer idsRespuestas y actualizar detalleJsonArray con Cierre y Respuestas realizadas
        idsRespuestas.forEach((respuesta) => {
          const detalle = detalleJsonArray[respuesta.id];
          if (detalle) {
            detalle.Estado = "Cierre";
            detalle.Respuestas = respuesta.respuestas;
          }
        });
        await updateDoc(plantillaRef, { detalleJson: detalleJsonArray }, { merge: true });
     
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {
      console.log("Error al actualizar objeto:", error);
    }
  }
};

// //SOBRE ESCRIBE TODO
// export const actualizarDocumentos = (id = '', respuestas = '', proceso = '') => {
//   return async (dispatch, getState) => {
//     console.log('Estoy en actualizarDocumentos')
//     console.log(id)
//     console.log(proceso)
//     console.log(respuestas)
    
//     const ruta = `plantilla/excel/formato/${ id }`;

//     try {
//       const plantillaRef = doc(FirebaseDB, ruta);
//       const plantillaSnapshot = await getDoc(plantillaRef);
    
//       if (plantillaSnapshot.exists()) {
//         // Obtener la matriz detalleJson de todo el documento o archivo
//         const detalleJsonArray = plantillaSnapshot.get("detalleJson");    
//         //Cambio de estado a Cierre
//         const respuestaTotal = respuestas.map(respuesta => {
//           return {
//             ...respuesta,
//             Estado: 'Cierre',
//           };
//         });
//         // iterar los objetos en respuestaTotal comparato con el total de registros para encontrar el indice
//         const detalleJson = Array(respuestaTotal.length).fill({});
//         respuestaTotal.forEach((respuesta) => {
//           // buscar el índice correspondiente en detalleJson
//           const index = detalleJsonArray.findIndex((obj) => obj.id === respuesta.id);
//           // si se encuentra el índice, actualizar el objeto en ese índice
//           if (index >= 0) {

//             console.log(respuesta)
//             detalleJson[index] = respuesta;
//           }
//         });
       
//         //Comienza leyendo solo la información indicada y se debe actualizar en firebase
//         console.log('Leyendo solo la información')
//         respuestaTotal.forEach(async (respuesta) => {
//           if (Object.keys(respuesta).length > 0) {
//             console.log(respuesta);
//             // Actualizar la matriz detalleJson en la base de dato
//           }
//         });
//         // Actualizar la matriz detalleJson en la base de datos
//         await updateDoc(plantillaRef, { detalleJson: detalleJson }, { merge: true });
//         console.log("Objeto actualizado con éxito");
//       } else {
//         console.log("El documento no existe");
//       }
//     } catch (error) {
//       console.log("Error al actualizar objeto:", error);
//     }
//   }
// };



//CODIGO SOLO CARGA EL PRIMER REGISTRO
// export const actualizarDocumentos = (id = '', respuestas = '', proceso = '') => {
//   return async (dispatch, getState) => {
//     console.log('Estoy en actualizarDocumentos')
//     console.log(id)
//     console.log(proceso)
//     console.log(respuestas)
    
//     const ruta = `plantilla/excel/formato/${ id }`;

//     try {
//       const plantillaRef = doc(FirebaseDB, ruta);
//       const plantillaSnapshot = await getDoc(plantillaRef);
    
//       if (plantillaSnapshot.exists()) {
//         // Obtener la matriz detalleJson
//         const detalleJsonArray = plantillaSnapshot.get("detalleJson");
//         console.log('detalleJsonArray')
//         console.log(detalleJsonArray)
    
//         // Buscar el objeto en el array que corresponde al id recibido como parámetro
//         // const index = detalleJsonArray.findIndex(obj => obj.id === id);

//         // // Verificar que el índice que se desea actualizar existe en la matriz
//         // if (index < 0) {
//         //   console.log(`El índice ${id} no existe en la matriz detalleJson`);
//         //   return;
//         // }

//         // Obtener el objeto en el índice especificado
//         const detalleJsonObject = detalleJsonArray[0];

//         // Crear un arreglo auxiliar para las respuestas
//         let respuestasAux = [];

//         // Iterar sobre cada registro del arreglo de respuestas
//         respuestas.forEach(objeto => {
//           const bloque = objeto["BLOQUES DE EVALUACIÓN"];
//           const categoria = objeto["CATEGORÍA"];
//           const pregunta = objeto["CONDUCTA"];
//           const cumplimientoBloque = objeto["CUMPLIMIENTO POR BLOQUES"];
//           const cumplimientoPregunta = objeto["CUMPLIMIENTO POR CATEGORIA"];
//           const respuesta = objeto["respuesta"];
//           respuestasAux.push({bloque,categoria, pregunta,respuesta,cumplimientoPregunta,cumplimientoBloque} );
//         });

//         console.log('respuestas1:');
//         console.log(respuestasAux);

//         const nuevoArreglo = respuestas.map((objeto) => {
//           const respuestasAux1 = [];
        
//           objeto.respuestas.forEach((respuestaObjeto) => {
//             const bloque = respuestaObjeto["BLOQUES DE EVALUACIÓN"];
//             const categoria = respuestaObjeto["CATEGORÍA"];
//             const pregunta = respuestaObjeto["CONDUCTA"];
//             const cumplimientoBloque = respuestaObjeto["CUMPLIMIENTO POR BLOQUES"];
//             const cumplimientoPregunta = respuestaObjeto["CUMPLIMIENTO POR CATEGORIA"];
//             const respuesta = respuestaObjeto["respuesta"];
//             respuestasAux1.push({
//               bloque,
//               categoria,
//               pregunta,
//               respuesta,
//               cumplimientoPregunta,
//               cumplimientoBloque,
//             });
//           });
        
//           return {
//             ANI: objeto.ANI,
//             Campo1: objeto.Campo1,
//             Campo11: objeto.Campo11,
//             Coordinador: objeto.Coordinador,
//             Direccion: objeto.Direccion,
//             Direccion1: objeto.Direccion1,
//             Ejecutivo: objeto.Ejecutivo,
//             Empresa: objeto.Empresa,
//             Enlace: objeto.Enlace,
//             Equipo: objeto.Equipo,
//             Estado: objeto.Estado,
//             FechadeGestion: objeto.FechadeGestion,
//             Monitor: objeto.Monitor,
//             Pais: objeto.Pais,
//             Seguro: objeto.Seguro,
//             Seguro1: objeto.Seguro1,
//             Socio: objeto.Socio,
//             Supervisor: objeto.Supervisor,
//             TMO: objeto.TMO,
//             TipodeAuditoria: objeto.TipodeAuditoria,
//             id: objeto.id,
//             respuestas: respuestasAux1,
            
//           };
//         });
        
//         console.log('Veamos como queda con esto')
//          console.log(nuevoArreglo)
        
//         // Agregar respuestas al objeto
//         detalleJsonObject.respuestas = respuestasAux;

//         // Actualizar campo estado en el objeto
//         detalleJsonObject.Estado = 'Cierre';

//         // Actualizar la matriz detalleJson en la base de datos
//         //detalleJsonArray.splice(index, 1, detalleJsonObject);
//         console.log(respuestas)
//         await updateDoc(plantillaRef, { detalleJson: nuevoArreglo }, { merge: true });
//         return
//         console.log("Campo respuesta agregado con éxito");
//       } else {
//         console.log("El documento no existe");
//       }
//     } catch (error) {
//       console.log("Error al agregar campo respuesta:", error);
//     }
//   }
// };

