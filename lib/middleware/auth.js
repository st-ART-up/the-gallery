const {
  receiveCode,
  exchangeCodeForToken,
  exchangeTokenForUser,
} = require('../utils/auth');

module.exports = async (req, res, next) => {
  try {
    // const code = await receiveCode();
    // const token = await exchangeCodeForToken(code);
    const user = await exchangeTokenForUser(req.body.token);
    req.artist = { user };
    next();
  } catch (e) {
    next(e);
  }
};
