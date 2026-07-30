const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');

// GET /api/quizzes — 퀴즈 목록 (인증 불필요)
router.get('/', quizController.getAllQuizzes);

// GET /api/quizzes/:id — 퀴즈 상세 (인증 불필요)
router.get('/:id', quizController.getQuizById);

// POST /api/quizzes/:id/submit — 답안 제출 (인증 필요)
router.post('/:id/submit', auth, quizController.submitAnswer);

module.exports = router;
