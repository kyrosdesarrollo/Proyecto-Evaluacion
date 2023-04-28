import { collection, doc, setDoc, getDoc , updateDoc} from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewFuncionario, estadoFinalSaving, savingFuncionario } from "./funcionarioSlice";
import { format } from 'date-fns'

export const funcionarioStartNew =( funcionario )=>{
    return async (dispatch, getSate) =>{
        dispatch(savingFuncionario());
        const { uid, displayName } = getSate().auth;
        // //uid este lo genera solo firebase database
        // //Estructrura de información
        console.log('Aqui esta agregando Funcionario')
        console.log(funcionario)
        // Creación de archivo JSON pauta
        const newFuncionario = {
            nombre :{displayName},
            funcionarios: funcionario,
            fecha: format(new Date(), 'dd/MM/yyyy HH:mm:ss '),
            status: 'Activo',
        }

      console.log(newFuncionario)
        try {
            //Ruta de ingreso de datos JSON pauta
            const newDoc = doc (collection(FirebaseDB,`funcionario`));
            const set = await setDoc(newDoc, newFuncionario);
            //Extrae el id del Documento
            //newExcel.id = newDoc.id;
            //Dispatch
            dispatch(addNewFuncionario(newFuncionario));
            
        } catch (error) {
            console.log(error)
        }
        //Cambia de estado el saving a false
        dispatch( estadoFinalSaving());
       
        // dispatch(setActiveNote(newNote));
        //Dispatch activación de nota
    }
}
