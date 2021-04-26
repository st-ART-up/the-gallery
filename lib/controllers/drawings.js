const { Router } = require('express');
const Drawing = require('../models/Drawing');
const auth = require('../middleware/auth');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const drawing = await Drawing.create({
      ...req.body,
      username: 'test_user',
    });
    res.send(drawing);
  } catch (e) {
    next(e);
  }
});
