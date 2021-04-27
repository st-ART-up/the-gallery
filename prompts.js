const welcomePrompt = {
  type: 'list',
  message: 'Welcome to stARTup.',
  name: 'option',
  choices: ['log me in!', 'Take me to the gallery anonymously', 'Exit'],
};
const canvasStudioGalleryPrompt = {
  type: 'list',
  message: 'Welcome to stARTup! What would you like to do?',
  name: 'option',
  choices: [
    'Visit the canvas',
    'Visit your studio',
    'Visit the gallery',
    'Exit',
  ],
};
const canvasPrompt = {
  type: 'list',
  message: 'Welcome to the Canvas!',
  name: 'option',
  choices: [
    'Create a new drawing',
    'Continue work on existing drawing',
    'Visit your studio',
    'Visit the gallery',
    'Exit',
  ],
};
const studioPrompt = {
  type: 'list',
  message: 'Welcome to the Studio!',
  name: 'option',
  choices: [
    'View your drawings',
    'Delete a drawing',
    'Visit the canvas',
    'Visit the gallery',
    'Exit',
  ],
};
const anonymousGalleryPrompt = {
  type: 'list',
  message: 'Welcome to the Gallery!',
  name: 'option',
  choices: [
    'View all drawings',
    'View random drawings',
    'View image carousel',
    'Log me in',
    'Exit',
  ],
};

const deletePrompt = {
  type: 'input',
  message: 'Enter the ID of the piece you would like to delete.',
  name: 'deleteIt',
};

<<<<<<< HEAD
<<<<<<< HEAD
const loginPrompt = {
  type: 'confirm',
  message: 'log in with your github account?',
  name: 'githubAuth',
};

=======
>>>>>>> b85ee3f63e455d5dae5b12a058f087e5ad586585
=======
const saveNewImagePrompt = [
  {
    type: 'input',
    message: 'Enter the file url',
    name: 'fileUrl',
  },
  {
    type: 'input',
    message: 'Enter the title of your piece',
    name: 'title',
  },
  {
    type: 'input',
    message: 'Enter a description of your piece',
    name: 'description',
  },
];

>>>>>>> 6910c426e423d1ddcca6ee7d2d6a8bd40182cad3
module.exports = {
  welcomePrompt,
  canvasPrompt,
  canvasStudioGalleryPrompt,
  studioPrompt,
  anonymousGalleryPrompt,
  deletePrompt,
<<<<<<< HEAD
<<<<<<< HEAD
  loginPrompt,
=======
>>>>>>> b85ee3f63e455d5dae5b12a058f087e5ad586585
=======
  saveNewImagePrompt,
>>>>>>> 6910c426e423d1ddcca6ee7d2d6a8bd40182cad3
};
