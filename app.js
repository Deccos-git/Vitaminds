const express = require('express');
const app = express();
const port = process.env.port || 5500

app.listen(port)

const fs = require("fs")
const html = "<h1>Test</h1>"

app.post("/", (res, req) => {
fs.writeFile("Public/Vitaminders/Naam.html", html, (err) => {
  console.log(err)
  })
})


