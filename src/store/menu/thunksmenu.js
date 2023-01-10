import { collection, doc, setDoc, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const thunkmenu = async (newMenu, uid) => {
        const newDocMenu = doc (collection(FirebaseDB, `${ uid }/evaluacion/menu`));
        await setDoc(newDocMenu, newMenu);
return 'Hola' 
}