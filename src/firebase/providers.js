import { createUserWithEmailAndPassword, 
         GoogleAuthProvider, 
         signInWithPopup, 
         updateProfile,
         signInWithEmailAndPassword ,sendEmailVerification, getAuth, signOut} from "@firebase/auth";

import { FirebaseApp, FirebaseAuth } from "./config";
;

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
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
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

export const registrarUsuario = async({ email, password, displayName }) => {
    const auth = getAuth(FirebaseApp);
    // crear el usuario sin autenticar
try {
  
    const userCredential = await createUserWithEmailAndPassword(auth,email, password, displayName);
    const uid = userCredential.user.uid;
} catch (error) {
    console.log(error)
}
    

    // try {
      
    //     console.log('aqui estoy registrando')
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       // Signed in
    //       const user = userCredential.user;
    //       signOut (auth);
    //       // ...
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // ..
    //     });
       
    //   } catch (error) {
    //     console.error(error);
    //   }

    // try {
    //     console.log('Aqui estoy en registro Usuario');
    //     console.log({email,password, displayName});
    //      createUserWithEmailAndPassword(FirebaseAuth,email, password, displayName);
    // //       console.log(userCredential)
    // //       // El usuario ha sido creado exitosamente
    // //       const user = userCredential.user;
    // //    // Enviar correo electrónico de verificación
    // //     user.sendEmailVerification()
    // //         .then(() => {
    // //         // Correo electrónico de verificación enviado correctamente.
    // //         console.log("Correo electrónico de verificación enviado.");
    // //         })
    // //         .catch((error) => {
    // //         // Si se produce algún error al enviar el correo electrónico de verificación, se mostrará aquí.
    // //         var errorCode = error.code;
    // //         var errorMessage = error.message;
    // //         console.log(errorCode + ": " + errorMessage);
    // //         });
    // //     console.log("Usuario creado exitosamente: ", user.uid);

      
    //     // Aquí puedes hacer algo con la información del usuario creado, como guardarla en una base de datos.
        
    //   } catch (error) {
    //     console.log(`Error ${error.code}: ${error.message}`);
    //     return { ok: false, errorMessage: error.message }
    //   }
    // try {
    //     console.log('Aqui estoy en registro Usuario');
    //     console.log({email,password, displayName});
    //     await FirebaseAuth.createUserWithEmailAndPassword( email, password )
    //     .then((userCredential) => {
    //         // El usuario ha sido creado exitosamente
    //         const user = userCredential.user;
    //         console.log("Usuario creado exitosamente: ", user.uid);
    //       })
    //       .catch((error) => {
    //         // Si se produce un error durante la creación de la cuenta
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(`Error ${errorCode}: ${errorMessage}`);
    //       });
    // } catch (error) {
       
    //     return { ok: false, errorMessage: error.message }
    // }

}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

      

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
