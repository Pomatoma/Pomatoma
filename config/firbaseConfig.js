// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // realtime database 초기화
import { firebaseSettings } from './env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseSettings.apiKey,
  authDomain: firebaseSettings.authDomain,
  projectId: firebaseSettings.projectId,
  storageBucket: firebaseSettings.storageBucket,
  messagingSenderId: firebaseSettings.messagingSenderId,
  appId: firebaseSettings.appId,
  measurementId: firebaseSettings.measurementId,
  databaseURL: firebaseSettings.databaseURL,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);  // app 인스턴스를 전달하여 올바르게 초기화
export const auth = getAuth(app);