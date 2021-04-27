const pool = require('../utils/pool');

module.exports = class Artist {
  username;
  avatar;

  constructor({ github_username, github_avatar }) {
    this.username = github_username;
    this.avatar = github_avatar;
  }

  static async create({ username, avatar }) {
    const {
      rows,
    } = await pool.query(`SELECT * 
    FROM users WHERE github_username=$1`, [
      username,
    ]);
    if (rows.length === 0) {
      const {
        rows,
      } = await pool.query(
        `INSERT INTO users (github_username, github_avatar) VALUES ($1, $2) RETURNING *`,
        [username, avatar]
      );
      return new Artist(rows[0]);
    }
    return new Artist(rows[0]);
  }
};
