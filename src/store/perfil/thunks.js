import { collection, doc, setDoc } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import  {loadExcelPautas} from "../../helpers/loadExcelPautas";
import { loadActivo, loadPerfil } from "../../helpers/loadPerfil";
import { savingOutPerfil, savingPerfil, setEstado, setPerfil } from "./perfilSlice";

export const startLoadingPerfil = ()=>{
    return async (dispatch, getState) =>{
        dispatch(savingPerfil());
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const perfil = await loadPerfil (uid);
        const estado = await loadActivo (uid);
        dispatch(setPerfil(perfil));
        dispatch(setEstado(estado));
        dispatch(savingOutPerfil());
    }
}
