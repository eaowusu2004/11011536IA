const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/emr', { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize Express
const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Electronic Medical Record System' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register Patient' });
});

app.post('/register', (req, res) => {
  const patient = {
    patientId: req.body.patientId,
    surname: req.body.surname,
    othernames: req.body.othernames,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    residentialAddress: req.body.residentialAddress,
    emergencyName: req.body.emergencyName,
    emergencyContact: req.body.emergencyContact,
    emergencyRelationship: req.body.emergencyRelationship
  };

  // Save patient to MongoDB
  mongoose.model('Patient', new mongoose.Schema({
    patientId: String,
    surname: String,
    othernames: String,
    gender: String,
    phoneNumber: String,
    residentialAddress: String,
    emergencyName: String,
    emergencyContact: String,
    emergencyRelationship: String
  }));

  // Redirect to homepage
  res.redirect('/');
});

app.get('/encounter', (req, res) => {
  res.render('encounter', { title: 'Start Encounter' });
});

app.post('/encounter', (req, res) => {
  const encounter = {
    patientId: req.body.patientId,
    dateAndTime: req.body.dateAndTime,
    type: req.body.type
  };

  // Save encounter to MongoDB
  mongoose.model('Encounter', new mongoose.Schema({
    patientId: String,
    dateAndTime: Date,
    type: String
  }));

  // Redirect to homepage
  res.redirect('/');
});

app.get('/vitals', (req, res) => {
  res.render('vitals', { title: 'Submit Vitals' });
});

app.post('/vitals', (req, res) => {
  const vitals = {
    patientId: req.body.patientId,
    bloodPressure: req.body.bloodPressure,
    temperature: req.body.temperature,
    pulse: req.body.pulse,
    spo2: req.body.spo2
  };

  // Save vitals to MongoDB
  mongoose.model('Vitals', new mongoose.Schema({
    patientId: String,
    bloodPressure: Number,
    temperature: Number,
    pulse: Number,
    spo2: Number
  }));

  // Redirect to homepage
  res.redirect('/');
});

app.get('/patients', (req, res) => {
  // Find all patients and render the results
  mongoose.model('Patient').find({}, (err, patients) => {
    res.render('patients', { title: 'Patients', patients: patients });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});