const { default: axios } = require('axios');
const displayImage = require('display-image');
const Artist = require('./lib/models/Artist');

const { anonymousGalleryPrompt } = require('./prompts');

const URL = 'https://futuramaapi.herokuapp.com/api/quotes';

const getAllImages = async () => {
  const allImages = await axios.get(`${URL}/2`);
  allImages.data.forEach((element) => {
    displayImage
      .fromURL(element.image)
      .then((image) => console.log(image, 'Press arrows keys to continue'));
  });
};

const getRandomImage = async () => {
  const randomImage = await axios.get(`${URL}/1`);

  displayImage
    .fromURL(randomImage.data[0].image)
    .then((image) => console.log(image, 'Press arrows keys to continue'));
  console.log(`

  ${randomImage.data[0].character}
  ${randomImage.data[0].quote}`);
};

const getUserDrawings = async () => {
  const allDrawings = await axios.get();
  allDrawings.data.forEach((element) => {
    displayImage
      .fromURL(element.image)
      .then((image) => console.log(image, 'Press arrows keys to continue'));
  });
};

const deleteADrawing = async () => {
  const deletedDrawing = await axios.delete();
};
const logUserIn = async ({ artist, avatar }) => {
  Artist.create({
    username: artist,
    avatar,
  });
  displayImage
    .fromURL(avatar)
    .then((image) => console.log(image, 'Press arrows keys to continue'));
};

module.exports = {
  getAllImages,
  getRandomImage,
  getUserDrawings,
  logUserIn,
};
