import { createUserWithEmailAndPassword, 
         GoogleAuthProvider, 
         signInWithPopup, 
         updateProfile,
         signInWithEmailAndPassword } from "@firebase/auth";
import { loadPerfil } from "../helpers/loadPerfil";
import { FirebaseAuth } from "./config";
// import { collection, getDocs } from "@firebase/firestore/lite";
// import { FirebaseDB } from "../firebase/config";


const googleProvider = new GoogleAuthProvider ();

export const singWithGoogle = async () =>{
    try {

        const results = await signInWithPopup (FirebaseAuth, googleProvider); 
        //const credentials = GoogleAuthProvider.credentialFromResult (results);
        const {displayName, email, photoURL, uid} = results.user;
        return {
            ok: true,
            displayName,email,photoURL,uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return{
            ok: false,
            errorMessage,
            

        }
        
    }

}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        console.log({ email,password,displayName });
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        // console.log(resp);
        //Actualizar displayName en Firebase

         await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

      //  let perfil = loadPerfil(uid);
      //  const perfil = 'ADMINISTRADOR';

        // console.log('LoadPerfil')
        // const usuarioPerfil = [];
        // docs.forEach(doc => {
        //     usuarioPerfil.push({ id: doc.id, ...doc.data() });
        // });
        // console.log(perfi.perfil);
        //  perfil = perfil.perfil;

        // console.log('Extraer perfil en Login coon email y password');
        // const perfil = loadPerfil(uid);
        // console.log(perfil)

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() =>{

    return await FirebaseAuth.signOut();
}
