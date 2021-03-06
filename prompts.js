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

module.exports = {
  welcomePrompt,
  canvasPrompt,
  canvasStudioGalleryPrompt,
  studioPrompt,
  anonymousGalleryPrompt,
  deletePrompt,
};
