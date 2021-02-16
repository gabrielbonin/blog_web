import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig =  {
  apiKey: "AIzaSyBk_xTSYb8-A0lJx_vzuOhj8nF030qSWHs",
  authDomain: "cursoreact-67bbb.firebaseapp.com",
  databaseURL: "https://cursoreact-67bbb-default-rtdb.firebaseio.com",
  projectId: "cursoreact-67bbb",
  storageBucket: "cursoreact-67bbb.appspot.com",
  messagingSenderId: "197372087423",
  appId: "1:197372087423:web:bf8dafc90a301e0158834a",
  measurementId: "G-S0LWFXTH6F"
};

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);
    this.app = app.database();
    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
   await app.auth().createUserWithEmailAndPassword(email, password)
   const uid = app.auth().currentUser.uid;
   return app.database().ref('usuarios').child(uid).set({
     nome: nome
   });
  }
  
  isInitialized(){
    return new Promise(resolve =>{
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUsername(callback){
    if(!app.auth().currentUser){
      return null
    }
    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback)
  }
  
}
export default new Firebase();