const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.port || 5500

const fs = require("fs")
const html = "<h1>Test</h1>"

app.use(express.static('Public'))


app.post("/api/user", (res, req) => {
  console.log(req.body)
// fs.writeFile("Public/Vitaminders/2.html", html, (err) => {
//   console.log(err)
//   })
})

app.listen(port)
