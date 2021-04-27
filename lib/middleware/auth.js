const {
  receiveCode,
  exchangeCodeForToken,
  exchangeTokenForUser,
} = require('../utils/auth');

module.exports = async (req, res, next) => {
  try {
    const code = await receiveCode();
    const token = await exchangeCodeForToken(code);
    const user = await exchangeTokenForUser(token);
    req.artist = { user };
    console.log(artist, 'AUTH CONTROLLER COMPLETE FLOW');
    next();
  } catch (e) {
    next(e);
  }
};
