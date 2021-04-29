const { Router } = require('express');
const Drawing = require('../models/Drawing');
const auth = require('../middleware/auth');

module.exports = Router()
  .post('/', auth, async (req, res, next) => {
    try {
      const drawing = await Drawing.create({
        ...req.body,
        artist: req.artist.artist,
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', auth, async (req, res, next) => {
    try {
      const drawing = await Drawing.get({
        artist: req.artist.artist,
        id: req.params.id,
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  })

  .get('/', auth, async (req, res, next) => {
    try {
      const drawings = await Drawing.get({ artist: req.artist.artist });
      res.send(drawings);
    } catch (e) {
      next(e);
    }
  })
  .get('/qty/:qty', async (req, res, next) => {
    try {
      const drawings = await Drawing.get({
        qty: req.params.qty,
      });
      res.send(drawings);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', auth, async (req, res, next) => {
    try {
      const drawing = await Drawing.update({
        ...req.body,
        artist: req.artist.artist,

        id: req.params.id,
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', auth, async (req, res, next) => {
    try {
      const drawing = await Drawing.delete({
        id: req.params.id,
        artist: req.artist.artist,
      });
      res.send(drawing);
    } catch (e) {
      next(e);
    }
  });
