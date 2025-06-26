package com.yousefalfoqaha.gjuplans.config;

import com.yousefalfoqaha.gjuplans.common.AppAuditorAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;

@Configuration
@EnableJdbcAuditing
public class JdbcConfig {

    @Bean
    AuditorAware<Long> auditorProvider() {
        return new AppAuditorAware();
    }
}
