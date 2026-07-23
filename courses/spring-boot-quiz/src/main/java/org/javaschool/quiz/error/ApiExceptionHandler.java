package org.javaschool.quiz.error;

import org.javaschool.quiz.question.QuestionNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
// 프로그램의 실패를 약속된 HTTP 오류 응답으로 바꿉니다.
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidAnswer(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("questionId와 choiceId를 확인해 주세요.");
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(error("INVALID_ANSWER", message));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableJson(HttpMessageNotReadableException exception) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(error("INVALID_ANSWER", "questionId와 choiceId를 숫자로 보내 주세요."));
    }

    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleQuestionNotFound(QuestionNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(error("QUESTION_NOT_FOUND", exception.getMessage()));
    }

    private ApiErrorResponse error(String code, String message) {
        return new ApiErrorResponse(new ApiError(code, message));
    }
}
