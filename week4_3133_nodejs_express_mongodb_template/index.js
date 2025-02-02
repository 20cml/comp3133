const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//const DB_NAME = "comp3123_assignment1"; 
//const DB_USER_NAME = "leecamila20";
//const DB_PASSWORD = "NIb5AGg7SmjYDycW";
//const CLUSTER_ID = "81oph";

const DB_CONNECTION = `mongodb+srv://leecamila20:303GGZFzq62KDjks@cluster0.81oph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(employeeRouter);

app.listen(8081, () => { console.log('Server is running...') });

