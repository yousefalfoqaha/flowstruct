package com.yousefalfoqaha.gjuplans.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yousefalfoqaha.gjuplans.common.AppAuditorAware;
import com.yousefalfoqaha.gjuplans.studyplan.converter.StudyPlanDraftReadingConverter;
import com.yousefalfoqaha.gjuplans.studyplan.converter.StudyPlanDraftWritingConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jdbc.core.convert.JdbcCustomConversions;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;

import java.util.List;

@Configuration
@EnableJdbcAuditing
@RequiredArgsConstructor
public class JdbcConfig {
    private final ObjectMapper objectMapper;

    @Bean
    AuditorAware<Long> auditorProvider() {
        return new AppAuditorAware();
    }

    @Bean
    public JdbcCustomConversions jdbcCustomConversions() {
        return new JdbcCustomConversions(List.of(
                new StudyPlanDraftReadingConverter(objectMapper),
                new StudyPlanDraftWritingConverter(objectMapper)
        ));
    }
}
