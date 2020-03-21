const functions = require('firebase-functions');
const express = require('express');
const app = express();

// Artikelen aanmaken op basis van URL
app.get('/Artikelen/:id',function(req,res)
{
    res.sendFile('Artikel.html', { root: __dirname });
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


exports.app = functions.https.onRequest(app);

