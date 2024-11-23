package com.yousefalfoqaha.flowsheet.section;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public Section createSection(CreateSectionRequest request) {
        var section = new Section();
        section.setName(request.name());
        section.setRequiredCreditHours(request.requiredCreditHours());

        switch (request.type()) {
            case SectionType.REMEDIAL:
            case SectionType.UNIVERSITY:
                if (request.parentId() != null) {
                    throw new IllegalArgumentException("University and Remedial sections cannot have a parent.");
                }
                break;
            case SectionType.SCHOOL:
                section.setSchool(AggregateReference.to(request.parentId()));
                break;
            case SectionType.PROGRAM:
                section.setProgram(AggregateReference.to(request.parentId()));
                break;
            default:
                throw new IllegalArgumentException("Must provide a section type.");
        }

        return sectionRepository.save(section);
    }
}
