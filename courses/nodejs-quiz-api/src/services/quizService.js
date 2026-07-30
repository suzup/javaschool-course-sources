const db = require('../database');

const quizService = {
  findAll() {
    const rows = db.prepare('SELECT id, question, options FROM quizzes').all();
    return rows.map((row) => ({
      ...row,
      options: JSON.parse(row.options),
    }));
  },

  findById(id) {
    const row = db.prepare('SELECT id, question, options FROM quizzes WHERE id = ?').get(id);
    if (!row) return null;
    return { ...row, options: JSON.parse(row.options) };
  },

  getAnswer(id) {
    return db.prepare('SELECT answer, explanation FROM quizzes WHERE id = ?').get(id);
  },

  saveSubmission(userId, quizId, selectedOption, isCorrect) {
    const result = db.prepare(
      'INSERT INTO submissions (user_id, quiz_id, selected_option, is_correct) VALUES (?, ?, ?, ?)'
    ).run(userId, quizId, selectedOption, isCorrect ? 1 : 0);
    return { id: result.lastInsertRowid };
  },
};

module.exports = quizService;
