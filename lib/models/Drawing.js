const pool = require('../utils/pool');

module.exports = class Drawing {
  id;
  drawingUrl;
  title;
  caption;
  artist;

  constructor({ id, drawing_url, title, caption, artist }) {
    this.id = id;
    this.drawingUrl = drawing_url;
    this.title = title;
    this.caption = caption;
    this.artist = artist;
  }

  static async create({ drawingUrl, title, caption, username }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO drawings (drawing_url, title, caption, artist) VALUES ($1, $2, $3, $4) RETURNING *`,
      [drawingUrl, title, caption, username]
    );
    return new Drawing(rows[0]);
  }
};
