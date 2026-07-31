package org.javaschool.quiz.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
// 다른 주소에서 열린 화면이 로그인 상태를 이어 갈 수 있도록 허용할 주소를 하나씩 적습니다.
public class WebConfig implements WebMvcConfigurer {

    // 개발 서버 주소는 설정에서 받습니다. 여러 개면 쉼표로 나눠 적습니다.
    @Value("${quiz.screen-origins}")
    private String[] screenOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/quiz/**")
                // 자격 증명을 허용할 때는 모든 주소(*)를 쓸 수 없으므로 주소를 명시합니다.
                .allowedOrigins(screenOrigins)
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization")
                .maxAge(3600);
    }
}
