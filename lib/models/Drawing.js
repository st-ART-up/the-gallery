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

  static async create({ drawingUrl, title, caption, artist }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO drawings (drawing_url, title, caption, artist) VALUES ($1, $2, $3, $4) RETURNING *`,
      [drawingUrl, title, caption, artist]
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

  static async update({ title, caption, id, artist }) {
    const {
      rows,
    } = await pool.query(
      `UPDATE drawings SET title=$1, caption=$2 WHERE id=$3 AND artist=$4 RETURNING *`,
      [title, caption, id, artist]
    );
    if (!rows)
      throw new Error(`no drawing found with id ${id} and artist ${artist}!`);
    return new Drawing(rows[0]);
  }

  static async delete({ id, artist }) {
    const {
      rows,
    } = await pool.query(
      `DELETE from drawings WHERE id=$1 AND artist=$2 RETURNING *`,
      [id, artist]
    );
    if (!rows)
      throw new Error(
        `no drawing belonging to ${artist} with id ${id} found to delete!`
      );
    return new Drawing(rows[0]);
  }
};
