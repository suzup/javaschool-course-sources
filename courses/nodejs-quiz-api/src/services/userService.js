const db = require('../database');

const userService = {
  findByUsername(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  },

  create(username, hashedPassword) {
    const result = db.prepare(
      'INSERT INTO users (username, password) VALUES (?, ?)'
    ).run(username, hashedPassword);
    return { id: result.lastInsertRowid, username };
  },
};

module.exports = userService;
