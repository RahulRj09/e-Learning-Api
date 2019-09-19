const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())
const routes = require('./app/routes/saral');
app.use('/saral', routes);
app.listen(7001);