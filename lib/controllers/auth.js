const {
    receiveCode,
    exchangeCodeForToken,
    exchangeTokenForUser,
} = require('../utils/auth');

module.exports = async () => {

    const code = await receiveCode();
    const token = await exchangeCodeForToken(code);
    const user = await exchangeTokenForUser(token);

    return user;
}

// to test output, change module.exports to const auth
// save and run below command in console after removing comments
// node -r dotenv/config ./lib/controllers/auth.js

// const testRun = async () => {
//     console.log(await auth(), 'AUTH CONTROLLER COMPLETE FLOW');
// }
// testRun();