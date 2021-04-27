const axios = require('axios');

const exchangeCodeForToken = (code) => {
    return fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code
        })
    })
        .then((res) => res.json())
        .then(({ access_token }) => access_token);
};

const exchangeTokenForUser = (token) => {
    return fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `token ${token}`

        },
    })
        .then((res) => res.json())
};