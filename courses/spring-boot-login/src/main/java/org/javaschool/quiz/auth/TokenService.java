package org.javaschool.quiz.auth;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
// 로그인한 사람의 번호와 만료 시각을 적고 서버만 만들 수 있는 서명을 붙입니다.
public class TokenService {

    private static final Base64.Encoder ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder DECODER = Base64.getUrlDecoder();

    private final byte[] secret;
    private final long validSeconds;

    public TokenService(
            @Value("${quiz.token.secret}") String secret,
            @Value("${quiz.token.valid-seconds}") long validSeconds
    ) {
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.validSeconds = validSeconds;
    }

    public String issue(long memberId) {
        long expiresAt = Instant.now().getEpochSecond() + validSeconds;
        String payload = memberId + ":" + expiresAt;
        String encodedPayload = ENCODER.encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        return encodedPayload + "." + sign(encodedPayload);
    }

    // 서명이 서버가 만든 것과 같고 만료 시각이 지나지 않았을 때만 회원 번호를 돌려줍니다.
    public long readMemberId(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 2) {
            throw new LoginRequiredException();
        }
        if (!sign(parts[0]).equals(parts[1])) {
            throw new LoginRequiredException();
        }
        String[] payload = new String(DECODER.decode(parts[0]), StandardCharsets.UTF_8).split(":");
        if (payload.length != 2) {
            throw new LoginRequiredException();
        }
        long expiresAt = Long.parseLong(payload[1]);
        if (expiresAt < Instant.now().getEpochSecond()) {
            throw new TokenExpiredException();
        }
        return Long.parseLong(payload[0]);
    }

    private String sign(String encodedPayload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret, "HmacSHA256"));
            return ENCODER.encodeToString(mac.doFinal(encodedPayload.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception error) {
            throw new IllegalStateException("토큰 서명을 만들 수 없습니다.", error);
        }
    }
}
