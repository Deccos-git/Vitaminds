var firebaseConfig = {
  apiKey: "AIzaSyB_y0DwGVL7PCB7xc5s2lSiaPCyzrGZOV4",
  authDomain: "vitaminds-78cfa.firebaseapp.com",
  databaseURL: "https://vitaminds-78cfa.firebaseio.com",
  projectId: "vitaminds-78cfa",
  storageBucket: "vitaminds-78cfa.appspot.com",
  messagingSenderId: "645063606604",
  appId: "1:645063606604:web:f8e27d4577f8622d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


