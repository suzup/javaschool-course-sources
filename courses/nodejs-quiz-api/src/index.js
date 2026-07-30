require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// 기본 미들웨어
app.use(express.json());

// 라우트
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 에러 처리 미들웨어 (라우트 뒤에 등록)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`퀴즈 API 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
