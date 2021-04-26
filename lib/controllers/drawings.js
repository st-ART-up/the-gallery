const { Router } = require('express');
const Drawing = require('../models/Drawing');
const auth = require('../middleware/auth');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const drawing = await Drawing.create({
        ...req.body,
        username: 'test_user',
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const drawing = await Drawing.get({
        artist: 'test_user',
        id: req.params.id,
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const drawings = await Drawing.get({ artist: 'test_user' });
      res.send(drawings);
    } catch (e) {
      next(e);
    }
  });
