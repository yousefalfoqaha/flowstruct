package com.yousefalfoqaha.gjuplans.config;

import com.yousefalfoqaha.gjuplans.common.AppAuditorAware;
import com.yousefalfoqaha.gjuplans.studyplan.converter.StudyPlanDraftReadingConverter;
import com.yousefalfoqaha.gjuplans.studyplan.converter.StudyPlanDraftWritingConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jdbc.core.convert.JdbcCustomConversions;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;

import java.util.List;

@Configuration
@EnableJdbcAuditing
public class JdbcConfig {

    @Bean
    AuditorAware<Long> auditorProvider() {
        return new AppAuditorAware();
    }

    @Bean
    public JdbcCustomConversions jdbcCustomConversions() {
        return new JdbcCustomConversions(List.of(
                new StudyPlanDraftReadingConverter(),
                new StudyPlanDraftWritingConverter()
        ));
    }
}
