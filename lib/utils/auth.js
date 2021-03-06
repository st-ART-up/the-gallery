const axios = require('axios');
const express = require('express');
const app = express();
const open = require('open');

const receiveCode = async () => {
    return new Promise((resolve) => {

        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Started on ${PORT}`);
        });

        // GitHub OAuth endpoint for user verification, the sent to redirect URI
        open(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`);

        // redirect URI with temp code set as query param
        app.use('/api/v1/auth', (req) => {
            resolve(req.query.code);
            server.close();

            console.log('Close Browswer Window to Continue'); // may not be needed depending on Inquirer flow
        });

    })
}

const exchangeCodeForToken = (code) => {
    return axios({
        url: 'https://github.com/login/oauth/access_token',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code
        })
    })
        .then((data) => data.data.access_token)
};

const exchangeTokenForUser = (token) => {
    return axios({
        url: 'https://api.github.com/user',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `token ${token}`

        },
    })
        .then((data) => data.data)
        .then(({ login, avatar_url }) => ({
            artist: login,
            avatar: avatar_url,
        }))
};

module.exports = {
    receiveCode,
    exchangeCodeForToken,
    exchangeTokenForUser
}