const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drawing = require('../lib/models/Drawing');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/auth.js', () => (req, res, next) => {
  req.user = {
    username: 'test-user',
    avatar: 'http://placekitten.com/200',
  };
  next();
});

describe('stARTup-gallery routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let testUser;
  let testDrawing;
  beforeEach(async () => {
    testUser = await User.create({
      username: 'test_user',
      avatar: 'http://placekitten.com/200',
    });
    testDrawing = await Drawing.create({
      drawingUrl: 'http://placekitten.com/500',
      title: 'kittintentions',
      caption: 'suddenly, a kitten; mystical, subliminal, terminal',
      username: 'test_user',
    });
  });

  afterAll(() => pool.end());

  const newDrawing = {
    drawingUrl: 'http://placekitten.com/500',
    title: 'Ceci n’est pas une chaton',
    caption: 'part of series: an exploration in anything but kittens',
  };

  it('posts a drawing by a user to the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/drawings')
      .send(newDrawing);
    expect(body).toEqual({
      ...newDrawing,
      id: '2',
      artist: 'test_user',
    });
  });

  it('gets a drawing by id & user from the database', async () => {
    const { body } = await request(app).get(
      `/api/v1/drawings/${testDrawing.id}`
    );
    expect(body).toEqual(testDrawing);
  });

  it('gets all drawings by a user from the database', async () => {
    const { body } = await request(app).get(`/api/v1/drawings`);
    expect(body).toEqual([testDrawing]);
  });

  it('gets a specified number of drawings from the database', async () => {
    const array = [1, 2, 3, 4, 5];
    for (num of array) {
      await Drawing.create({
        drawingUrl: `http://placekitten.com/50${num}`,
        title: `test kitten ${num}`,
        caption: `test caption ${num}`,
        username: 'test_user',
      });
    }
    const { body } = await request(app).get(`/api/v1/drawings/qty/2`);
    expect(body).toEqual([
      testDrawing,
      {
        artist: 'test_user',
        caption: 'test caption 1',
        drawingUrl: 'http://placekitten.com/501',
        id: '2',
        title: 'test kitten 1',
      },
    ]);
  });

  it('updates a drawing by id & user in the database', async () => {
    const { body } = await request(app)
      .patch(`/api/v1/drawings/${testDrawing.id}`)
      .send({
        caption: 'a kitten purrs and the world is anew',
      });
    expect(body).toEqual({
      ...testDrawing,
      caption: 'a kitten purrs and the world is anew',
    });
  });
});
