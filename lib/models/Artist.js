const pool = require('../utils/pool');

module.exports = class Artist {
  artist;
  avatar;

  constructor({ github_username, github_avatar }) {
    this.artist = github_username;
    this.avatar = github_avatar;
  }

  static async create({ artist, avatar }) {
    const { rows } = await pool.query(
      `SELECT * 
    FROM artists WHERE github_username=$1`,
      [artist]
    );
    if (rows.length === 0) {
      const {
        rows,
      } = await pool.query(
        `INSERT INTO artists (github_username, github_avatar) VALUES ($1, $2) RETURNING *`,
        [artist, avatar]
      );
      return new Artist(rows[0]);
    }
    return new Artist(rows[0]);
  }
};
