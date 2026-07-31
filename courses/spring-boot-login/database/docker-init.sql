CREATE DATABASE IF NOT EXISTS java_quiz_test
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

GRANT ALL PRIVILEGES ON java_quiz_test.* TO 'quiz_app'@'%';
FLUSH PRIVILEGES;
