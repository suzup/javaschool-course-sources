const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const authController = {
  // POST /api/auth/register
  register(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'username과 password는 필수입니다' });
      }

      if (password.length < 4) {
        return res.status(400).json({ error: '비밀번호는 4자 이상이어야 합니다' });
      }

      const existing = userService.findByUsername(username);
      if (existing) {
        return res.status(409).json({ error: '이미 존재하는 사용자입니다' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = userService.create(username, hashedPassword);

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ message: '회원가입 성공', token });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/auth/login
  login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'username과 password는 필수입니다' });
      }

      const user = userService.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: '사용자를 찾을 수 없습니다' });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: '비밀번호가 일치하지 않습니다' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ message: '로그인 성공', token });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
