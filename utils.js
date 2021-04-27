const { default: axios } = require('axios');
const displayImage = require('display-image');
<<<<<<< HEAD
=======
const { stARTupSkeleton } = require('.');
>>>>>>> b85ee3f63e455d5dae5b12a058f087e5ad586585

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
    const deletedDrawing = await axios.delete()
}

module.exports = {
  getAllImages,
  getRandomImage,
  getUserDrawings,
};


