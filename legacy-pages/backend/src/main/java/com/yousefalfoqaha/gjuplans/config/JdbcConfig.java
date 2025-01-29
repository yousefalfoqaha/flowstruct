package com.yousefalfoqaha.gjuplans.config;

import com.yousefalfoqaha.gjuplans.converter.CourseTypeToStringConverter;
import com.yousefalfoqaha.gjuplans.converter.StringToCourseTypeConverter;
import org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration;
import org.springframework.lang.NonNull;

import java.util.List;

public class JdbcConfig extends AbstractJdbcConfiguration {

    @Override
    protected @NonNull List<?> userConverters() {
        return List.of(
                new CourseTypeToStringConverter(),
                new StringToCourseTypeConverter()
        );
    }
}
