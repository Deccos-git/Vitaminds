const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_licm1PHJnZ26zQHj8OGkBV1Z00CgJf2SX8');
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

// Stripe
const endpointSecret = "whsec_YS59bdkyVZrr3v9SInNkbqzWmNEBVGHa"

// only use the raw bodyParser for webhooks
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  });

  app.post('/webhook', (req, res) => {
    let sig = req.headers["stripe-signature"];

    try {
        let event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

        db.collection("PaymentSuccess").doc().set({
            Event: event
        }).then(() => {
            res.send('Status 200').end()
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).end()
    };
});

function createSession(sessionNumber, amount){
app.post(sessionNumber, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['ideal', 'card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Gelukstegoed',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.vitaminds.nu/succes.html',
      cancel_url: 'https://www.vitaminds.nu/subscription',
    });
  
    res.json({ id: session.id });
  });
};

createSession('/create-session-five', 500)
createSession("/create-session-ten", 1000)
createSession("/create-session-fiveteen", 1500)
createSession("/create-session-twenty", 2000)
createSession("/create-session-twentyfive", 2500)
createSession("/create-session-thirty", 3000)
createSession("/create-session-thirtyfive", 3500)
createSession("/create-session-fourty", 4000)
createSession("/create-session-fifty", 50000)
createSession("/create-session-sixty", 6000)
createSession("/create-session-seventy", 7000)
createSession("/create-session-eighty", 8000)
createSession("/create-session-ninety", 9000)
createSession("/create-session-hundred", 10000)
createSession("/create-session-hundredfifty", 15000)
createSession("/create-session-twohundred", 20000)

// Analytics aanmaken op basis van URL
app.get('/analyse/:id',function(req,res)
{
    res.sendFile('analytics.html', { root: __dirname });
});

// Subscriptions aanmaken op basis van URL
app.get('/subscription/:id',function(req,res)
{
    res.sendFile('subscriptions.html', { root: __dirname });
});

// Group aanmaken op basis van URL
app.get('/Group/:id',function(req,res)
{
    res.sendFile('coachgroup.html', { root: __dirname });
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

//Kenniscentrum
app.get('/Kenniscentrum-coaching/:id',function(req,res)
{
    res.sendFile('Kennis.html', { root: __dirname });
});

// Intervisie
app.get('/Intervisions/:id',function(req,res)
{
    res.sendFile('Intervision.html', { root: __dirname });
});

// Cooperation
app.get('/Cooperation/:id',function(req,res)
{
    res.sendFile('cooperate.html', { root: __dirname });
});

// Events
app.get('/eventpage/:id',function(req,res)
{
    res.sendFile('event.html', { root: __dirname });
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

// Tool sheduling

db.collection("Vitaminders")
.where("Usertype", "==", "Coach")
.where("Usertype", "==", "Vitaminder")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const gebruikersnaamClean = doc.data().GebruikersnaamClean
        const gebruikersnaam = doc.data().Gebruikersnaam
        const email = doc.data().Email

                cron.schedule("00 09 1,15 * *", () => {

                db.collection("Mail").doc().set({
                    to: email,
                    cc: "info@vitaminds.nu",
                message: {
                subject: `Hoe gaat het met je, ${gebruikersnaamClean}`,
                html: `Hallo, ${gebruikersnaamClean}</br></br>
                    Je bent lid geworden van Vitaminds om je geluk in eigen handen te nemen. <br>
                    Deze twee-wekelijkse mail is bedoeld om je te helpen om je geluk een onderdeel te maken van je dagelijks.<br><br>
                    Wat is op dit moment je geluksniveau? <br><br>
                    <a href="https://vitaminds.nu/Vitaminders/${gebruikersnaam}"> 
                        <img src="https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/geluksschaal-plaatje-small.png?alt=media&token=5edf44ed-b2dc-46d2-ad7d-7a6215ef80b6" alt="Geluksschaal"> 
                    </a></br></br>
                
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
});

// // Coachgroup sheduling

// db.collection("Chats").where("Type", "==", "Coachgroup").get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {

//         const members = doc.data().Members
//         const room = doc.data().RoomClean
//         const coach = doc.data().Creater
//         const data = doc.data().data
//         const sessionLength = doc.data().SessionLenght
        
//         members.forEach(member => {

//         db.collection("Vitaminders")
//         .where("Gebruikersnaam", "==", member)
//         .get()
//         .then(querySnapshot => {
//             querySnapshot.forEach(doc1 => {

//                 const email = doc1.data().Email
//                 const gebruikersnaamClean = doc1.data().GebruikersnaamClean

//                 db.collection("Vitaminders")
//                 .where("Gebruikersnaam", "==", coach)
//                 .get()
//                 .then(querySnapshot => {
//                 querySnapshot.forEach(doc2 => {

//                     const coachClean = doc2.data().GebruikersnaamClean

//                 cron.schedule(" 0 8 * * 6", () => {

//                 db.collection("Mail").doc().set({
//                     to: email,
//                     cc: "info@vitaminds.nu",
//                 message: {
//                 subject: `Herinnering voor je coachgroep bijeenkomst`,
//                 html: `Hallo, ${gebruikersnaamClean}</br></br>
//                     Bij deze ontvang je van ons even een herinnering over de bijeenkomst van je coachgroep ${room}
//                     van coach ${coachClean} <br><br>
//                     Je coachgroep komt bij elkaar op<br>
//                     <b>${data}</b><br><br>

//                     De bijeenkomst duurt <br>
//                     <b>${sessionLength} minuten</b><br><br>

//                     Namens ${coachClean}: tot ${data} <br><br> 
                
//                     Vriendelijke groet, </br></br>
//                     Het Vitaminds Team </br></br>
//                     <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
//                 Type: "Vitaminders",
//                 gebruikersnaam: member
//                 }      
//                 }).catch((err) => {
//                     console.log(err)
//                 });
//             });
//         });
//     });

//             });
//         }).catch((err) => {
//             console.log(err)
//         });
//     });
//     });
// }).catch((err) => {
//     console.log(err)
// });

// Redirects

app.get('/agenda/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/leden/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/locatie/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/author/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/home/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/product/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/news-feed/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/coaches-2/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/voor-coach.html',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/open-up/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/tags/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/activity/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/activiteiten/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/comments/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/wp-admin/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/klachtenprocedure/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/na-het-overwinnen-van-mijn-hoogtevrees-kan-ik-de-wereld-aan-not/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/keuzes-maken/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/product-category/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/kinderen/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/samenwerken/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/vitale-wijken/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/eten/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/zelfkennis/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/gezond-eten-is-belangrijk-maar-soms-een-brownie-is-ook-niet-verkeerd/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/delen/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/category/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/locatie-edanz/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/organisator/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/dagbesteding/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/wanneer-leid-je-een-betekenisvol-leven/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/jouw-gezamenlijke-menselijkheid/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/de-kleine-geneugten-van-het-bewuste-leven/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/wat-heb-je-aan-positiviteit/*',function(req,res)
{
    res.redirect('https://vitaminds.nu/Artikelen/Positiviteit.html');
});

app.get('/hoeveel-positiviteit-is-goed-voor-je/*',function(req,res)
{
    res.redirect('https://vitaminds.nu/Artikelen/Positiviteit.html');
});

app.get('/mijn-account/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/bedankt/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/login-2/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/wall/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/coaching/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/feestelijke opening/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/groepen-2/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/onderwerpen/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/academy/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/community/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/levenskunst/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/volwassenen-2/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/tag/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/werken/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/bewegen/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/voeding/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/platform/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});

app.get('/verbonden-leven-met-anderen-en-jezelf/*',function(req,res)
{
    res.sendFile('/index-redirect.html', { root: __dirname });
});



exports.app = functions.https.onRequest(app);