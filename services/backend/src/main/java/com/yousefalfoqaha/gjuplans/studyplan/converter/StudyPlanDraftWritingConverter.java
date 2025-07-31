package com.yousefalfoqaha.gjuplans.studyplan.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;
import com.yousefalfoqaha.gjuplans.studyplan.exception.InvalidDraftException;
import lombok.NoArgsConstructor;
import org.postgresql.util.PGobject;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

import java.sql.SQLException;

@WritingConverter
@NoArgsConstructor
public class StudyPlanDraftWritingConverter implements Converter<StudyPlanDraft, PGobject> {
    private ObjectMapper objectMapper;

    public StudyPlanDraftWritingConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public PGobject convert(StudyPlanDraft draft) {
        PGobject jsonObject = new PGobject();
        jsonObject.setType("json");

        try {
            jsonObject.setValue(objectMapper.writeValueAsString(draft));
        } catch (SQLException | JsonProcessingException e) {
            throw new InvalidDraftException("Draft is invalid.");
        }

        return jsonObject;
    }
}
