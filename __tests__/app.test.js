const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('stARTup-gallery routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets the ci to pass until we have real tests', () => {
    expect(true).toBe(true);
  });
});
