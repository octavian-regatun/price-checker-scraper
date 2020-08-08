require('dotenv').config();
require('./src/utils/connect');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./src/routes/default')(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
