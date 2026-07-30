const quizService = require('../services/quizService');

const quizController = {
  // GET /api/quizzes
  getAllQuizzes(req, res, next) {
    try {
      const quizzes = quizService.findAll();
      res.json({ quizzes });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/quizzes/:id
  getQuizById(req, res, next) {
    try {
      const quiz = quizService.findById(Number(req.params.id));

      if (!quiz) {
        return res.status(404).json({ error: '퀴즈를 찾을 수 없습니다' });
      }

      res.json({ quiz });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/quizzes/:id/submit
  submitAnswer(req, res, next) {
    try {
      const quizId = Number(req.params.id);
      const { selectedOption } = req.body;

      if (selectedOption === undefined || selectedOption === null) {
        return res.status(400).json({ error: 'selectedOption 값이 필요합니다' });
      }

      const answer = quizService.getAnswer(quizId);

      if (!answer) {
        return res.status(404).json({ error: '퀴즈를 찾을 수 없습니다' });
      }

      const isCorrect = answer.answer === selectedOption;

      // 제출 기록 저장
      quizService.saveSubmission(req.user.id, quizId, selectedOption, isCorrect);

      res.json({
        correct: isCorrect,
        correctAnswer: answer.answer,
        explanation: answer.explanation,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = quizController;
