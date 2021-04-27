const express = require('express');
const app = express();

app.use(express.json());
<<<<<<< HEAD
// app.use('/api/v1/drawings', require('./controllers/drawings'));
=======
=======

app.use('/api/v1/drawings', require('./controllers/drawings'));
>>>>>>> aa3451f0e99e8fa2df0b25b370aa35067325d152
// app.use('/api/v1/users', require('./controllers/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
