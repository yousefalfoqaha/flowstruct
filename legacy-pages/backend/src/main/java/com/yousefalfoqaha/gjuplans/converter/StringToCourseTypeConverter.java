package com.yousefalfoqaha.gjuplans.converter;

import com.yousefalfoqaha.gjuplans.course.domain.CourseType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.lang.NonNull;

@ReadingConverter
public class StringToCourseTypeConverter implements Converter<String, CourseType> {

    @Override
    public CourseType convert(@NonNull String source) {
        return CourseType.valueOf(source);
    }
}
