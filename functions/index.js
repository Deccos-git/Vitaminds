const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createHTML = require('create-html')
const fs = require("fs");
const admin = require('firebase-admin');

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
admin.initializeApp(firebaseConfig);

  const db = admin.firestore();
  const auth = admin.auth();

const urlencodedParser = bodyParser.urlencoded({extended: true});

app.post("/user", urlencodedParser, (req, res) => {
  const username = req.body.gebruikersnamen
  const email = req.body.email
  const password = req.body.password
  const html = createHTML({
    title: `Digimind van ${username}`,
    body: '<h1>Test</h1>',
    css: "Style/style.css",
  })

  auth.createUser({
    uid: username,
    email: email,
    password: password
  }).then(() =>{
  db.collection('Vitaminders').doc(username).set({
    Gebruikersnaam: username,
    Usertype: "Vitaminder",
    Inspiratiepunten: 1,

  }).catch(err => {
    console.log(err)
  })
  })

fs.writeFile(`../Public/Vitaminders/${username}.html`, html, (err) => {
  })
  res.send("Uw account is aangemaakt")
});

exports.app = functions.https.onRequest(app);

