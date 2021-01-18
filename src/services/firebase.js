import app from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
const config = {
   apiKey: "AIzaSyBmIcRoW1W55HUxkDq2I8A76VbfSOvifew",
  authDomain: "greenary-gardens.firebaseapp.com",
  projectId: "greenary-gardens",
  storageBucket: "greenary-gardens.appspot.com",
  messagingSenderId: "909264771422",
  appId: "1:909264771422:web:445f6d6267c15d4c9e17cf",
  measurementId: "G-B1J3H3H0GL"
};

if (!app.apps.length) {
   app.initializeApp(config);
}else {
   app.app(); // if already initialized, use that one
}

const firebaseDb = app.firestore()
const storageRef = app.storage().ref()

export default app;

export async function addUser(email,password){
    try{
    let userData = await app.auth().createUserWithEmailAndPassword(email,password)
    await firebaseDb.collection('users').doc(userData.user.uid).set({
        email,
        password,
        createdAt: app.firestore.FieldValue.serverTimestamp()
            })
    }
    catch(error){
        alert(error.message)
    }
}
export async function logoutUser(){
    try{
        await app.auth().signOut()
    }
    catch(err){
        alert(err.message)
    }
}
export async function loginUser(email,password){
    try{
        await app.auth().signInWithEmailAndPassword(email,password)
    }
    catch(error){
        alert(error.message)
    }
}


export async function addDocument(collectionName,data){ 
    await firebaseDb.collection(collectionName)
    .add(
        {
           ...data,
           createdAt: app.firestore.FieldValue.serverTimestamp()
        })
}
export async function getAllDocuments(collectionName){
    let response = await firebaseDb.collection(collectionName).orderBy("createdAt","desc").get()
    let data = []
    response.forEach((doc) => {
        data = [...data, { id: doc.id, ...doc.data() }]
    })
    return data
}
export async function getSingleDocument(collectionName,id){
    let doc = await firebaseDb.collection(collectionName).doc(id).get()
    if (collectionName === "users") {
        return {isAdmin:doc.data().isAdmin}
    }
    return { id: doc.id, ...doc.data() }
}
export async function updateDocument(collectionName,id,data){
    await firebaseDb.collection(collectionName).doc(id).set(data,{merge:true})
}
export async function deleteDocument(collectionName,id,imageUrl){
 
        const fileRef = app.storage().refFromURL(imageUrl)
         try{       
        await firebaseDb.collection(collectionName).doc(id).delete()

        await fileRef.delete()
            }
            catch(err){
                console.log(err)
            }

}

export async function uploadImage(collectionName,date,imageData){
    const fileRef = storageRef.child(`/${collectionName}/images/${imageData.name+' '+date}`);
    await fileRef.put(imageData)
    let url = await fileRef.getDownloadURL()
    return url
}