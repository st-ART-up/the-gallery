const axios = require('axios');
const fs = require('fs').promises;
const FormData = require('form-data');

// feed imgurPost description and file location as parameters
// default for description is created using st-ART-up canvas
const imgurPost = async () => {

    const fd = new FormData();
    const data = await fs.readFile(`${__dirname}/art/hackerman.jpg`);
    fd.append('image', data);
    fd.append('title', 'yollo')
    fd.append('description', 'made using stARTup');

    return axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
        data: fd
    })
        // .then((data) => data.data)
        .then((data) => console.log(data.body));
};

imgurPost();

// return from above
// delete hash can be used in conjunction with endpoint to remove from imgur on gallery delete if wanted
// {
//     data: {
//  **   id: 'oHVSMC6',
//  **   title: null,
//  **   description: 'yollo',
//       datetime: 1619145419,
//       type: 'image/jpeg',
//       animated: false,
//       width: 1920,
//       height: 1080,
//       size: 386915,
//       views: 0,
//       bandwidth: 0,
//       vote: null,
//       favorite: false,
//       nsfw: null,
//       section: null,
//       account_url: null,
//       account_id: 0,
//       is_ad: false,
//       in_most_viral: false,
//       has_sound: false,
//       tags: [],
//       ad_type: 0,
//       ad_url: '',
//       edited: '0',
//       in_gallery: false,
//  **   deletehash: 'C1XbIcSvO0tE5NU',
//       name: '',
//  **   link: 'https://i.imgur.com/oHVSMC6.jpg' 
//     },
//     success: true,
//     status: 200
//   }