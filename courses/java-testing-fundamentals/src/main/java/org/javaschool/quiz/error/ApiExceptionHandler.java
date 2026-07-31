package org.javaschool.quiz.error;

import org.javaschool.quiz.question.QuestionNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
// 여러 Controller에서 생긴 예상 가능한 실패를 같은 모양의 HTTP 오류 응답으로 바꿉니다.
public class ApiExceptionHandler {

    // JSON은 읽었지만 @Min, @Max 같은 입력 조건에 맞지 않을 때 422를 보냅니다.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidAnswer(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().isEmpty()
                ? "questionId와 choiceId를 확인해 주세요."
                : exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(error("INVALID_ANSWER", message));
    }

    // 숫자 자리에 글자를 보내는 등 JSON을 요청 DTO로 읽지 못한 경우도 입력 오류로 안내합니다.
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableJson(HttpMessageNotReadableException exception) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(error("INVALID_ANSWER", "questionId와 choiceId를 숫자로 보내 주세요."));
    }

    // 요청한 문제 행이 없으면 404와 문제 없음 코드를 보냅니다.
    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleQuestionNotFound(QuestionNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(error("QUESTION_NOT_FOUND", exception.getMessage()));
    }

    // 오류 코드와 안내 문장을 공통 error 응답 모양으로 묶습니다.
    private ApiErrorResponse error(String code, String message) {
        return new ApiErrorResponse(new ApiError(code, message));
    }
}
