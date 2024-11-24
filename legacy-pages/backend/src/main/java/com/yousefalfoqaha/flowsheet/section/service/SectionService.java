package com.yousefalfoqaha.flowsheet.section.service;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.dto.request.CreateSectionRequest;
import com.yousefalfoqaha.flowsheet.section.dto.response.SectionResponse;
import com.yousefalfoqaha.flowsheet.section.repository.SectionRepository;
import com.yousefalfoqaha.flowsheet.section.validation.SectionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private final SectionValidator sectionValidator;

    @Autowired
    public SectionService(SectionRepository sectionRepository, SectionValidator sectionValidator) {
        this.sectionRepository = sectionRepository;
        this.sectionValidator = sectionValidator;
    }

    public List<SectionResponse> getSectionsByIds(List<Long> sectionIds) {
        return sectionRepository.findAllById(sectionIds)
                .stream()
                .map(sec -> new SectionResponse(
                        sec.getId(),
                        sec.getName(),
                        sec.getRequiredCreditHours(),
                        sec.getType().toString(),
                        sec.getCourses()
                                .stream()
                                .map(sc -> sc.getCourse().getId())
                                .toList()
                ))
                .toList();
    }

    public Section createSection(CreateSectionRequest request) {
        var section = Section.from(request);
        sectionValidator.validate(section);

        return sectionRepository.save(section);
    }
}
