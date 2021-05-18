import firebase from 'firebase'
 var firebaseConfig = {
    apiKey: "AIzaSyCnryzL4Z0AXfgV8KL5khARKOpaVkq88_c",
    authDomain: "saproject-f6154.firebaseapp.com",
    projectId: "saproject-f6154",
    storageBucket: "saproject-f6154.appspot.com",
    messagingSenderId: "458067571752",
    appId: "1:458067571752:web:848d06238799021011b11d"
  };
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire