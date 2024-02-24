const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors =  require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect('mongodb+srv://himanshusinghpurnea:Hs532002@cluster0.plypueb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true});

const sensorDataSchema = new mongoose.Schema({
  value: Number,
  date: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

app.post('/data', (req, res) => {
  const data = new SensorData({ value: req.body.sensorData });
  data.save(err => {
    if (err) return res.send(500, { error: err });
    return res.sendStatus(200);
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));