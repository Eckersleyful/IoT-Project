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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
app.post('/palju', (req, res) => {
    console.log("Arduino pinged")
    var new_JSON = req.body;
    req.app.locals.data = new_JSON;
    console.log(req.app.locals.data.temperature);
    res.sendStatus(200)
})
app.get('/palju', (req, res) => {

    console.log(req.app.locals.data);

    res.render("landing_page.html", temperature = req.app.locals.data.temperature);
});
app.get('/paljudata', (req, res) => {
    console.log(req.app.locals.data);
    console.log("Front pinged")
    res.send(req.app.locals.data)
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) 
})