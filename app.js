
//nieuwe html creeren met onclick event in DOM
const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const createHTML = require('create-html');
const port = 5500;
const naam = "Cees"

const html = createHTML({
    title: `Digimind van ${naam}`,
    body: '<h1> Test </h1>'
  })

app.post("../RegisterVM", (req, sent) => {
  fs.writeFile(`../Vitaminders/${naam}.html`, html, function () { 
  })
})

app.get('../test.html', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}!`));

  