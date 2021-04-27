const inquirer = require('inquirer');
const { listen } = require('./lib/app');
const {
  anonymousGalleryPrompt,
  canvasPrompt,
  canvasStudioGalleryPrompt,
  welcomePrompt,
  studioPrompt,
  deletePrompt,
} = require('./prompts');
const { getAllImages, getRandomImage, getUserDrawings } = require('./utils');

const stARTupSkeleton = (newPrompt) => {
  inquirer
    .prompt({
      type: newPrompt.type,
      message: newPrompt.message,
      name: newPrompt.name,
      choices: newPrompt.choices,
    })
    .then((response) => {
      const res = response.option;
      if (res === 'log me in!') {
        // oauth link
        stARTupSkeleton(canvasStudioGalleryPrompt);
      } else if (res === 'Take me to the gallery anonymously') {
        stARTupSkeleton(anonymousGalleryPrompt);
      } else if (res === 'Exit') {
        console.log('See you later!');
      } else if (res === 'Visit the canvas') {
        stARTupSkeleton(canvasPrompt);
      } else if (res === 'Visit your studio') {
        stARTupSkeleton(studioPrompt);
      } else if (res === 'Visit the gallery') {
        stARTupSkeleton(anonymousGalleryPrompt);
      } else if (res === 'Create a new drawing') {
        // link to blank canvas
      } else if (res === 'Continue work on existing drawing') {
        // put route
      } else if (res === 'View your drawings') {
        getUserDrawings().then(stARTupSkeleton(studioPrompt));
      } else if (res === 'Delete a drawing') {
        deleteSkeleton();
      } else if (res === 'View all drawings') {
        getAllImages().then(stARTupSkeleton(anonymousGalleryPrompt));
      } else if (res === 'View random drawings') {
        getRandomImage().then(stARTupSkeleton(anonymousGalleryPrompt));
      }
    });
};

const deleteSkeleton = () => {
  inquirer.prompt(deletePrompt).then((response) => {
    response.deleteIt;
  });
};

stARTupSkeleton(welcomePrompt);
