import {Section, SectionLevel, SectionType} from "@/features/study-plan/types.ts";

export const getSectionCode = (section: Section) => {
    let code = '';

    switch (section.level) {
        case SectionLevel.University:
            code += '1.';
            break;
        case SectionLevel.School:
            code += '2.';
            break;
        case SectionLevel.Program:
            code += '3.';
            break;
    }

    switch (section.type) {
        case SectionType.Requirement:
            code += '1.';
            break;
        case SectionType.Elective:
            code += '2.';
            break;
        case SectionType.Remedial:
            code += '3.';
            break;
    }

    return code += '1';
}