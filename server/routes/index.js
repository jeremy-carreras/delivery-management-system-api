const express = require('express');
const app = express();

app.use(require('./Auth'));
app.use(require('./User'));
app.use(require('./Category'));
app.use(require('./Product'));
app.use(require('./Order'));
app.use(require('./OrderItem'));
app.use(require('./BakeryFlavor'));
app.use(require('./BreadType'));

module.exports = app;
