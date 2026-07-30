const db = require('./database');

const quizzes = [
  {
    question: 'Node.js는 어떤 엔진 위에서 동작하나요?',
    options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'],
    answer: 1,
    explanation: 'Node.js는 Google Chrome의 V8 JavaScript 엔진을 사용합니다.',
  },
  {
    question: 'Express에서 JSON 요청 본문을 파싱하는 미들웨어는?',
    options: ['express.text()', 'express.json()', 'express.urlencoded()', 'express.raw()'],
    answer: 1,
    explanation: 'express.json()은 Content-Type이 application/json인 요청의 본문을 파싱합니다.',
  },
  {
    question: 'HTTP 상태 코드 201은 무엇을 의미하나요?',
    options: ['OK', 'Created', 'No Content', 'Accepted'],
    answer: 1,
    explanation: '201 Created는 요청이 성공적으로 처리되어 새로운 리소스가 생성되었음을 나타냅니다.',
  },
  {
    question: 'REST API에서 리소스를 삭제할 때 사용하는 HTTP 메서드는?',
    options: ['POST', 'PUT', 'PATCH', 'DELETE'],
    answer: 3,
    explanation: 'DELETE 메서드는 지정된 리소스를 삭제할 때 사용합니다.',
  },
  {
    question: 'Express 미들웨어에서 다음 미들웨어로 넘기는 함수는?',
    options: ['pass()', 'next()', 'continue()', 'forward()'],
    answer: 1,
    explanation: 'next()를 호출하면 다음 미들웨어 함수로 제어가 넘어갑니다.',
  },
  {
    question: 'JWT의 세 부분을 구분하는 문자는?',
    options: ['콜론 (:)', '점 (.)', '슬래시 (/)', '하이픈 (-)'],
    answer: 1,
    explanation: 'JWT는 Header.Payload.Signature 형태로 점(.)으로 구분됩니다.',
  },
  {
    question: 'bcrypt에서 salt rounds를 높이면 어떻게 되나요?',
    options: ['해싱이 빨라진다', '해싱이 느려진다', '변화 없다', '에러가 발생한다'],
    answer: 1,
    explanation: 'salt rounds가 높을수록 해싱 반복 횟수가 증가해 느려지지만 보안은 강화됩니다.',
  },
  {
    question: 'SQLite에서 자동 증가하는 기본 키를 만드는 키워드는?',
    options: ['AUTO_INCREMENT', 'SERIAL', 'INTEGER PRIMARY KEY AUTOINCREMENT', 'IDENTITY'],
    answer: 2,
    explanation: 'SQLite에서는 INTEGER PRIMARY KEY AUTOINCREMENT로 자동 증가 키를 만듭니다.',
  },
  {
    question: 'Express에서 라우트 파라미터에 접근하는 객체는?',
    options: ['req.body', 'req.query', 'req.params', 'req.headers'],
    answer: 2,
    explanation: 'req.params는 URL 경로에 포함된 라우트 파라미터에 접근합니다. 예: /users/:id',
  },
  {
    question: '에러 처리 미들웨어의 매개변수 개수는?',
    options: ['2개 (req, res)', '3개 (req, res, next)', '4개 (err, req, res, next)', '1개 (err)'],
    answer: 2,
    explanation: 'Express 에러 처리 미들웨어는 (err, req, res, next) 4개의 매개변수를 가집니다.',
  },
];

// 기존 퀴즈 데이터 삭제 후 다시 삽입
db.prepare('DELETE FROM quizzes').run();

const insert = db.prepare(
  'INSERT INTO quizzes (question, options, answer, explanation) VALUES (?, ?, ?, ?)'
);

const insertMany = db.transaction((items) => {
  for (const item of items) {
    insert.run(item.question, JSON.stringify(item.options), item.answer, item.explanation);
  }
});

insertMany(quizzes);

console.log(`✅ ${quizzes.length}개의 퀴즈가 삽입되었습니다.`);
