const apiKey = import.meta.env.VITE_FIRBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIRBASE_AUTHDOMAIN;
const projectId = import.meta.env.VITE_FIRBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIRBASE_STORAGE_BUCKTET;
const messagingSenderId = import.meta.env.VITE_FIRBASE_MESSAGE_SENDER_ID;
const appId = import.meta.env.VITE_FIRBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIRBASE_MEASUREMENT_ID;
const databaseURL = import.meta.env.VITE_FIRBASE_DATABASE_URL;

export const firebaseSettings = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  measurementId,
  messagingSenderId,
  measurementId,
  appId,
  databaseURL,
};
