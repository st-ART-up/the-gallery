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

  static async get({ id, qty, artist }) {
    if (id) {
      const {
        rows,
      } = await pool.query(`SELECT * FROM drawings WHERE artist=$1 AND id=$2`, [
        artist,
        id,
      ]);
      return new Drawing(rows[0]);
    } else if (qty) {
      const { rows } = await pool.query(`SELECT * FROM drawings LIMIT $1`, [
        qty,
      ]);
      return rows.map((row) => new Drawing(row));
    } else {
      const {
        rows,
      } = await pool.query(`SELECT * FROM drawings WHERE artist=$1`, [artist]);
      return rows.map((row) => new Drawing(row));
    }
  }
};
