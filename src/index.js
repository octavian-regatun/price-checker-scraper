require('dotenv').config();

const PORT = process.env.PORT || 8000;

const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Server running!');
});

require('./routes/search')(app);

server.listen(PORT, () => {
  console.log('Server running');
});
