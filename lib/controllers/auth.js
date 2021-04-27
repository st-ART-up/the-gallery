const {
    receiveCode,
    exchangeCodeForToken,
    exchangeTokenForUser,
} = require('../utils/auth');

const test = async () => {

    const code = await receiveCode();
    const token = await exchangeCodeForToken(code);
    const user = await exchangeTokenForUser(token);

    console.log(user, 'AUTH CONTROLLER COMPLETE FLOW');
    return user;
}

test();