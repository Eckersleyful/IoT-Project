const { json } = require('body-parser')
const express = require('express')
const bp = require("body-parser")
const app = express()
const port = 3000
const router = express.Router();

/*
 * Database.
 */

const { DeviceModel } = require('./models/Models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://database:27017/', {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    return console.error('Error connecting to database:', err);
  }
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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
app.use(router);

/**
 * Get all devices in the current database.
 */
app.get('/device', (req, res) => {
  DeviceModel.find({}, (err, doc) => {
    if (err) {
      res.status(500)
      return res.json({
        'Error': 'Failed to find devices.'
      })
    }
    res.status(200)
    res.json(doc)
  })
})

/**
 * Get device with the given id.
 */
router.route('/device/:id')
  .get((req, res) => {
    DeviceModel.findById(req.params.id, (err, doc) => {
      if (err) {
        res.status(500)
        return res.json({
          'Error': 'Invalid request.'
        })
      }
      if (!doc) {
        res.status(404)
        return res.json({
          'Error': 'Device not found!'
        })
      }
      res.status(200)
      res.json(doc)
    })
  })

/**
 * Post request to crete add new device to the database.
 */
app.post('/device/new', (req, res) => {
  console.log('Add device')
  new DeviceModel()
    .save((err, doc) => {
      if (err) {
        res.status(500)
        return res.json({
          'Error': 'Failed to add new device.'
        })
      }
      res.status(201)
      res.json(doc)
    })
})

/**
 * Add new report for a device.
 * Request body should contain an 'id' and report object containing 'isFull' and 'temperature'.
 */
router.route('/report/:id')
  .post((req, res) => {
    DeviceModel.updateOne({
      _id: req.params.id
    }, {
      $push: {
        reports: req.body
      }
    }, (err) => {
      if (err) {
        res.status(500)
        return res.json({
          'Error': 'Failed to add report'
        })
      }
      res.status(200)
      res.json({ 'Message': 'Report added!' })
    })
  })

app.get('/', (req, res) => {
  // mmmmhhh.
  res.render('index.html')
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))