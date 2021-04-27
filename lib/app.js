const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/drawings', require('./controllers/drawings'));
app.use('/api/v1/users', require('./middleware/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
