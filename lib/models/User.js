const pool = require('../utils/pool');

module.exports = class User {
  username;
  avatar;

  constructor({ github_username, github_avatar }) {
    this.username = github_username;
    this.avatar = github_avatar;
  }

  static async create({ username, avatar }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO users (github_username, github_avatar) VALUES ($1, $2) RETURNING *`,
      [username, avatar]
    );
    return new User(rows[0]);
  }
};
