const { json } = require('body-parser')
const express = require('express')
const bp = require("body-parser")
const app = express()
const port = 3000
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.locals.data = {}

app.post('/palju', (req, res) => {
    console.log("Arduino pinged")
    console.log(JSON.stringify(req.body));
    req.app.locals.data = {message: req.body.message}
    res.sendStatus(200)
})
app.get('/palju', (req, res) => {

    console.log(req.app.locals.data);

    res.render("landing_page.html", message = req.app.locals.data);
});
app.get('/paljudata', (req, res) => {
    console.log(req.app.locals.data);
    console.log("Front pinged")
    res.send(req.app.locals.data)
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) 
})