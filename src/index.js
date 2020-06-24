require('dotenv').config();

const PORT = 8000;

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Server running!');
});

require('./routes/search')(app);

app.listen(PORT, () => {
  console.log('Server running');
});
