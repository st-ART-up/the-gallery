const { Router } = require('express');
const auth = require('../middleware/auth');
const Artist = require('../models/Artist');

module.exports = Router().post('/', auth, async (req, res, next) => {
  try {
    const artist = await Artist.create(req.artist);
    res.send(artist);
  } catch (e) {
    next(e);
  }
});
