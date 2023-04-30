import { collection, doc, setDoc, deleteDoc,getDocs, where, query ,updateDoc,getDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadExcelFormatos } from "../../helpers/loadExcelFormatos";
import { addNewEmptyExcelFormato, deleteFormatoById, savingNewExcelFormato, setFormatos } from "./formatoSlice";
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
export const startUpdateFormato = (arreglo, id = '')=>{

    return async(dispatch, getState) =>{
        //Deja estado saving en true
        console.log('Arreglo en update');
        console.log(arreglo);
        console.log(id)
        
        //Incio de Estado para guardar
        dispatch(savingNewExcelFormato());
        const { uid, displayName } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        try {
            const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss ')
            const documento = doc(FirebaseDB, `/plantilla/excel/formato/${ id }`);
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
//Actualizacion de respuestas
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
        //Descarga de formatos actualizados
        dispatch(startLoadingFormatos());
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
    //Cambia estado guardar true, para indicar que esta en proceso
    dispatch(savingNewExcelFormato());
    //Id es el código del documento Frebase ejemplo 3edatrtrw65f
    const ruta = `plantilla/excel/formato/${ id }`;
    try {
      //Realiza conexión con ruta y extracción de documentos
      const plantillaRef = doc(FirebaseDB, ruta);
      const plantillaSnapshot = await getDoc(plantillaRef);
    
      if (plantillaSnapshot.exists()) {
        // Obtener la matriz detalleJson de todo el documento o archivo
        const detalleJsonArray = plantillaSnapshot.get("detalleJson");    
        
        console.log(detalleJsonArray)
        //Extrae id y las respuestas
        const idsRespuestas = respuestas.map((respuesta) => {
          return {
            id: respuesta.id - 1,
            respuestas: respuesta.respuestas
          };
        });
        console.log(idsRespuestas)
        // Recorrer idsRespuestas y actualizar detalleJsonArray con Cierre y Respuestas realizadas
        idsRespuestas.forEach((respuesta) => {
          const detalle = detalleJsonArray[respuesta.id];
          if (detalle) {
            detalle.Estado = "Cierre";
            detalle.Respuestas = respuesta.respuestas;
          }
        });
        console.log(detalleJsonArray)
        await updateDoc(plantillaRef, { detalleJson: detalleJsonArray }, { merge: true });
        //Descarga de formatos actualizados
        dispatch(startLoadingFormatos());
         //Cambia de estado el saving a false, para dar finalizado el cambio
         dispatch( deleteFormatoById());
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {
      console.log("Error al actualizar objeto:", error);
    }
  }
};
// **** VALIDAR PROCESO DE ACTUALIZACION ******
export const cierreDocumento = (id = '', respuestas = '') => {
  return async (dispatch, getState) => {

    console.log('Estoy en cierre comienza la acción ...')

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
            detalle.Estado = "Finalizado";
            //detalle.Respuestas = respuesta.respuestas;
          }
        });


        console.log('Esto es lo que cargará como Finalizado')
        console.log(detalleJsonArray)
        await updateDoc(plantillaRef, { detalleJson: detalleJsonArray }, { merge: true });
        //Descarga de formatos actualizados
        dispatch(startLoadingFormatos());
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {
      console.log("Error al actualizar objeto:", error);
    }
  }
};
