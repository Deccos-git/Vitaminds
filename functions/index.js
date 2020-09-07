const functions = require('firebase-functions');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const admin = require('firebase-admin');
// const stripe = require('stripe')('sk_test_licm1PHJnZ26zQHj8OGkBV1Z00CgJf2SX8');
const cron = require('node-cron');

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

// Prerender
app.use(require('prerender-node').set('prerenderToken', 'Ab0cCom4i1KuazJ2YhDA'));

// Bodyparser Middleware
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// const urlencodedParser = bodyParser.urlencoded({extended: true});

// Group aanmaken op basis van URL
app.get('/Group/:id',function(req,res)
{
    res.sendFile('group.html', { root: __dirname });
});

// Chat aanmaken op basis van URL
app.get('/Chats/:id',function(req,res)
{
    res.sendFile('chat.html', { root: __dirname });
});

// Workshops aanmaken op basis van URL
app.get('/Workshops/:id',function(req,res)
{
    res.sendFile('workshop.html', { root: __dirname });
});


// Levensvraag artikelen aanmaken op basis van URL
app.get('/Artikelen/:id',function(req,res)
{
    res.sendFile('Artikel.html', { root: __dirname });
});

// Thema artikelen aanmaken op basis van URL
app.get('/Theme-articles/:id',function(req,res)
{
    res.sendFile('theme-article.html', { root: __dirname });
});

// Thema aanmaken op basis van URL

app.get('/Thema/:id',function(req,res)
{
    res.sendFile('thema.html', { root: __dirname });
});

//Digimind aanmaken op basis van URL

app.get('/Vitaminders/:id',function(req,res)
{
    res.sendFile('digimind.html', { root: __dirname });
});

//Openup aanmaken op basis van URL

app.get('/Open/:id',function(req,res)
{
    res.sendFile('open.html', { root: __dirname });
});

app.get('/Kenniscentrum-coaching/:id',function(req,res)
{
    res.sendFile('Kennis.html', { root: __dirname });
});

// Tool sheduling

db.collection("Practice").where("Practice", "==", "Check-in").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam

        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const email = doc1.data().Email
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean

                cron.schedule(" 0 8 * * 6", () => {

                db.collection("Mail").doc().set({
                    to: email,
                    cc: "info@vitaminds.nu",
                message: {
                subject: `Check in bij je doel op Vitaminds `,
                html: `Hallo, ${gebruikersnaamClean}</br></br>
                    Geluk zit hem in kleine dagelijkse gewoontes. <br>
                    Met de Vitaminds Tools maken we onze persoonlijke ontwikkeling een onderdeel van onze dagelijkse gewoontes.<br><br>

                    Bij deze ontvang jij je <i>Check in</i> notificatie voor je doel: <br><br>

                    -${levensvraag}<br><br>  

                    Ga naar <a href="https://vitaminds.nu/inlog.html"> Vitaminds </a>, log in en Check in!<br><br> 
                
                    Vriendelijke groet, </br></br>
                    Het Vitaminds Team </br></br>
                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                Type: "Vitaminders",
                gebruikersnaam: gebruikersnaam
                }
                        
                }).catch((err) => {
                    console.log(err)
                })
            });

            })
        }).catch((err) => {
            console.log(err)
        })
    })
}).catch((err) => {
    console.log(err)
})

exports.app = functions.https.onRequest(app);

