import { collection, doc, setDoc, getDocs } from "@firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const thunkmenu = async (newMenu, uid) => {
        try {
        const newDocMenu = doc (collection(FirebaseDB, `${ uid }/evaluacion/menu`));
        await setDoc(newDocMenu, newMenu);
                
        } catch (error) {
                console.log('thunkMenu : '+ error)
        }
        
return 'Hola' 
}