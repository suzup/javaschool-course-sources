CREATE DATABASE IF NOT EXISTS java_quiz
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

CREATE DATABASE IF NOT EXISTS java_quiz_test
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

CREATE USER IF NOT EXISTS 'quiz_app'@'localhost' IDENTIFIED BY 'change_me';
GRANT ALL PRIVILEGES ON java_quiz.* TO 'quiz_app'@'localhost';
GRANT ALL PRIVILEGES ON java_quiz_test.* TO 'quiz_app'@'localhost';
FLUSH PRIVILEGES;
