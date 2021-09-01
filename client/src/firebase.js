import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBlgQeLZhCz0J5AUUmSqdwhvW9JsLS47Mg',
  authDomain: 'sandbox-3a2e3.firebaseapp.com',
  projectId: 'sandbox-3a2e3',
  storageBucket: 'sandbox-3a2e3.appspot.com',
  messagingSenderId: '1045233270084',
  appId: '1:1045233270084:web:6233b7f5ed56fc47406b11',
};

firebase.initializeApp(firebaseConfig);

// export const getCurrentUserToken = () => {
//   console.log('getCurrentUserToken got called!');
// }
export const getCurrentUserToken = () => getAuth().currentUser.getIdToken();

export default firebase;
