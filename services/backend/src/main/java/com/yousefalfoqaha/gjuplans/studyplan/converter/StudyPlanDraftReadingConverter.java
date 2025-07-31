package com.yousefalfoqaha.gjuplans.studyplan.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;
import com.yousefalfoqaha.gjuplans.studyplan.exception.InvalidDraftException;
import lombok.NoArgsConstructor;
import org.postgresql.util.PGobject;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

@ReadingConverter
@NoArgsConstructor
public class StudyPlanDraftReadingConverter implements Converter<PGobject, StudyPlanDraft> {
    private ObjectMapper objectMapper;

    public StudyPlanDraftReadingConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public StudyPlanDraft convert(PGobject jsonObject) {
        String draftString = jsonObject.getValue();
        try {
            return objectMapper.readValue(draftString, StudyPlanDraft.class);
        } catch (JsonProcessingException e) {
            throw new InvalidDraftException("Invalid draft.");
        }
    }
}
