const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('stARTup-gallery routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let testUser;
  beforeEach(async () => {
    testUser = await User.create({
      userName: 'test_user',
      avatar: 'http://placekitten.com/200',
    });
  });

  afterAll(() => pool.end());

  const newDrawing = {
    drawing_url: 'http://placekitten.com/500',
    title: 'a random kitten',
    caption: 'part of series: an exploration in random kittens',
  };

  it('posts a drawing by a user to the database', async () => {
    const { body } = await request(app).post('/api/v1/drawings').send({});
    expect(body).toEqual({
      ...newDrawing,
      id: 'some id',
      artist: 'new_user',
    });
  });
});
