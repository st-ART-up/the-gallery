const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drawing = require('../lib/models/Drawing');
const Artist = require('../lib/models/Artist');

jest.mock('../lib/middleware/auth.js', () => (req, res, next) => {
  req.artist = {
    artist: 'test_artist',
    avatar: 'http://placekitten.com/200',
  };
  next();
});

describe('stARTup-gallery routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let testDrawing;
  beforeEach(async () => {
    await Artist.create({
      artist: 'test_artist',
      avatar: 'http://placekitten.com/200',
    });
    testDrawing = await Drawing.create({
      drawingUrl: 'http://placekitten.com/500',
      title: 'kittintentions',
      caption: 'suddenly, a kitten; mystical, subliminal, terminal',
      artist: 'test_artist',
    });
  });

  afterAll(() => pool.end());

  const newDrawing = {
    drawingUrl: 'http://placekitten.com/500',
    title: 'Ceci n’est pas une chaton',
    caption: 'part of series: an exploration in anything but kittens',
  };

  it('posts a drawing by a artist to the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/drawings')
      .send(newDrawing);
    expect(body).toEqual({
      ...newDrawing,
      id: '2',
      artist: 'test_artist',
    });
  });

  it('gets a drawing by id & artist from the database', async () => {
    const { body } = await request(app).get(
      `/api/v1/drawings/${testDrawing.id}`
    );
    expect(body).toEqual(testDrawing);
  });

  it('gets all drawings from the database', async () => {
    const { body } = await request(app).get(`/api/v1/drawings`);
    expect(body).toEqual([testDrawing]);
  });

  it('gets all drawings by a artist from the database', async () => {
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
        artist: 'test_artist',
      });
    }
    const { body } = await request(app).get(`/api/v1/drawings/qty/2`);
    expect(body).toEqual([
      testDrawing,
      {
        artist: 'test_artist',
        caption: 'test caption 1',
        drawingUrl: 'http://placekitten.com/501',
        id: '2',
        title: 'test kitten 1',
      },
    ]);
  });

  it('updates a drawing by id & artist in the database', async () => {
    const { body } = await request(app)
      .put(`/api/v1/drawings/${testDrawing.id}`)
      .send({
        title: 'kittensinmittens',
        caption: 'a kitten purrs and the world is anew',
      });
    expect(body).toEqual({
      ...testDrawing,
      caption: 'a kitten purrs and the world is anew',
      title: 'kittensinmittens',
    });
  });

  it('deletes a drawing by id & artist from the database', async () => {
    const { body } = await request(app).delete(
      `/api/v1/drawings/${testDrawing.id}`
    );
    expect(body).toEqual(testDrawing);
  });

  it('adds an artist to the artists table via post', async () => {
    const { body } = await request(app).post(`/api/v1/artists/`).send();

    expect(body).toEqual({
      artist: expect.any(String),
      avatar: expect.any(String),
    });
  });

  it('gets all drawings by a artist from the database', async () => {
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
        artist: 'test_artist',
      });
    }
    const { body } = await request(app).get(`/api/v1/drawings/qty/2`);
    expect(body).toEqual([
      testDrawing,
      {
        artist: 'test_artist',
        caption: 'test caption 1',
        drawingUrl: 'http://placekitten.com/501',
        id: '2',
        title: 'test kitten 1',
      },
    ]);
  });

  it('updates a drawing by id & artist in the database', async () => {
    const { body } = await request(app)
      .put(`/api/v1/drawings/${testDrawing.id}`)
      .send({
        title: 'kittensinmittens',
        caption: 'a kitten purrs and the world is anew',
      });
    expect(body).toEqual({
      ...testDrawing,
      caption: 'a kitten purrs and the world is anew',
      title: 'kittensinmittens',
    });
  });

  it('deletes a drawing by id & artist from the database', async () => {
    const { body } = await request(app).delete(
      `/api/v1/drawings/${testDrawing.id}`
    );
    expect(body).toEqual(testDrawing);
  });

  // it('adds an artist to the artists table via post', async () => {
  //   const { body } = await request(app).post(`/api/v1/artists/`).send();

  //   expect(body).toEqual({
  //     artist: expect.any(String),
  //     avatar: expect.any(String),
  //   });
  // });
});
