package org.javaschool.quiz.error;

import org.javaschool.quiz.auth.ForbiddenException;
import org.javaschool.quiz.auth.LoginRequiredException;
import org.javaschool.quiz.auth.TokenExpiredException;
import org.javaschool.quiz.member.LoginFailedException;
import org.javaschool.quiz.member.MemberNameTakenException;
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

    // JSON은 읽었지만 @Min, @Max, @Size 같은 입력 조건에 맞지 않을 때 422를 보냅니다.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidInput(MethodArgumentNotValidException exception) {
        String target = exception.getBindingResult().getObjectName();
        // 같은 검사 실패라도 어느 요청이 막혔는지 화면이 구분할 수 있게 코드를 나눕니다.
        boolean memberInput = target.equals("signupRequest") || target.equals("loginRequest");
        String code = memberInput ? "INVALID_MEMBER_INPUT" : "INVALID_ANSWER";
        String fallback = memberInput ? "이름과 비밀번호를 확인해 주세요." : "questionId와 choiceId를 확인해 주세요.";
        String message = exception.getBindingResult().getFieldErrors().isEmpty()
                ? fallback
                : exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(error(code, message));
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

    // 로그인이 필요한 요청에 로그인 정보가 없으면 401을 보냅니다.
    @ExceptionHandler(LoginRequiredException.class)
    public ResponseEntity<ApiErrorResponse> handleLoginRequired(LoginRequiredException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(error("LOGIN_REQUIRED", exception.getMessage()));
    }

    // 로그인은 했지만 남의 자료를 요청하면 403을 보냅니다.
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiErrorResponse> handleForbidden(ForbiddenException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(error("FORBIDDEN", exception.getMessage()));
    }

    // 서명은 맞지만 시간이 지난 토큰은 401과 만료 코드로 알립니다.
    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ApiErrorResponse> handleTokenExpired(TokenExpiredException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(error("TOKEN_EXPIRED", exception.getMessage()));
    }

    // 이름이 없거나 비밀번호가 다르면 어느 쪽이 틀렸는지 알리지 않고 401을 보냅니다.
    @ExceptionHandler(LoginFailedException.class)
    public ResponseEntity<ApiErrorResponse> handleLoginFailed(LoginFailedException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(error("LOGIN_FAILED", exception.getMessage()));
    }

    // 이미 있는 이름으로 가입하려 하면 409를 보냅니다.
    @ExceptionHandler(MemberNameTakenException.class)
    public ResponseEntity<ApiErrorResponse> handleMemberNameTaken(MemberNameTakenException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(error("MEMBER_NAME_TAKEN", exception.getMessage()));
    }

    // 오류 코드와 안내 문장을 공통 error 응답 모양으로 묶습니다.
    private ApiErrorResponse error(String code, String message) {
        return new ApiErrorResponse(new ApiError(code, message));
    }
}
