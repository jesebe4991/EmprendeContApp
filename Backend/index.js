const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const bodyParser = require('body-parser');
const routes = require('./routes/routes')

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
