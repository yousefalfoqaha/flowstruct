package com.yousefalfoqaha.gjuplans.converter;

import com.yousefalfoqaha.gjuplans.course.domain.CourseType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

@WritingConverter
public class CourseTypeToStringConverter implements Converter<CourseType, String> {

    @Override
    public String convert(CourseType source) {
        return source.name();
    }
}
