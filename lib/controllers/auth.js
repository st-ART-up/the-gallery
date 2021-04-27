const express = require('express');
const app = express();
const open = require('open');

module.exports = async function authenticate() {
    return new Promise((resolve) => {

        const PORT = process.env.PORT || 7890;
        const server = app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Started on ${PORT}`);
        });

        // GitHub OAuth endpoint for user verification, the sent to redirect URI
        open(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`);

        // redirect URI with temp code set as query param
        app.use('/test/login/callback', (req) => {
            resolve(req.query.code);
            console.log('Close Browswer Window to Continue'); // may not be needed depending on Inquirer flow
            server.close();
        });

    })
}