const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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

// Artikelen aanmaken op basis van URL
app.get('/Artikelen/:id',function(req,res)
{
    res.sendFile('Artikel.html', { root: __dirname });
});

//Digimind aanmaken op basis van URL

app.get('/Vitaminders/:id',function(req,res)
{
    res.sendFile('digimind.html', { root: __dirname });
});

// Vitaminder profiel aanmaken

app.post("/user", urlencodedParser, (req, res) => {
  const username = req.body.gebruikersnamen
  const email = req.body.email
  const password = req.body.password

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
  res.send("Uw account is aangemaakt")
  })
});

// Coach profiel aanmaken

app.post("/coach", urlencodedParser, (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const coachstijl = req.body.coachstijl
  const levensvisie = req.body.levensvisie
  const locatie = req.body.locatie
  const doelgroep = req.body.dropdwon

  auth.createUser({
    uid: username,
    email: email,
    password: password
  }).then(() =>{
  db.collection('Vitaminders').doc(username).set({
    Gebruikersnaam: username,
    Usertype: "Coach",
    Inspiratiepunten: 1,
    Coachstijl: coachstijl,
    Omschrijving: levensvisie,
    Locatie: locatie,
    Doelgroep: doelgroep

  }).catch(err => {
    console.log(err)
  })
  res.send("Uw account is aangemaakt")
})
})

exports.app = functions.https.onRequest(app);

