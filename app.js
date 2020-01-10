const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 5500
const createHTML = require('create-html')
const fs = require("fs");
const naam = 'Henk'

const html = createHTML({
  title: `Digimind van ${naam}`,
  body: '<h1>Test</h1>',
  css: "Style/style.css"
})

bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json());

app.use(express.static('Public'))

app.post("/api/user", (res, req) => {
  console.log(req.body)
// fs.writeFile("Public/Vitaminders/2.html", html, (err) => {
//   console.log(err)
//   })
})

app.listen(port)
