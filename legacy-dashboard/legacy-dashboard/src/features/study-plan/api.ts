import {
    CoursePlacement,
    CourseRelation,
    MoveDirection,
    Section,
    StudyPlan,
    StudyPlanSummary
} from "@/features/study-plan/types.ts";
import {CourseSummary} from "@/features/course/types.ts";
import {api} from "@/shared/api.ts";

const ENDPOINT = '/study-plans';

export const getStudyPlanList = () =>
    api.get<StudyPlanSummary[]>(ENDPOINT);

export const getStudyPlan = (studyPlanId: number) =>
    api.get<StudyPlan>([ENDPOINT, studyPlanId]);

export const createStudyPlan = ({studyPlanDetails}: {
    studyPlanDetails: Partial<StudyPlan>
}) =>
    api.post<StudyPlan>(ENDPOINT, {
        body: studyPlanDetails
    });

export const moveCourseToSemester = ({studyPlanId, courseId, targetPlacement}: {
    studyPlanId: number,
    courseId: number,
    targetPlacement: CoursePlacement
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'course-placements', courseId], {
        body: targetPlacement
    });

export const deleteStudyPlan = (studyPlanId: number) =>
    api.delete<void>([ENDPOINT, studyPlanId]);

export const getStudyPlanCourseList = (studyPlanId: number) =>
    api.get<Record<number, CourseSummary>>([ENDPOINT, studyPlanId, 'courses']);

export const editStudyPlanDetails = ({studyPlanId, studyPlanDetails}: {
    studyPlanId: number;
    studyPlanDetails: Partial<StudyPlan>
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId], {body: studyPlanDetails});

export const createSection = ({studyPlanId, sectionDetails}: {
    studyPlanId: number;
    sectionDetails: Partial<Section>
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'create-section'], {body: sectionDetails});

export const addCoursesToStudyPlan = ({courseIds, sectionId, studyPlanId}: {
    courseIds: number[];
    sectionId: number;
    studyPlanId: number
}) =>
    api.post<StudyPlan>([ENDPOINT, studyPlanId, 'sections', sectionId, 'courses'], {
        params: {
            courses: courseIds
        }
    });

export const editSectionDetails = ({sectionDetails, sectionId, studyPlanId}: {
    sectionDetails: Partial<Section>;
    sectionId: number;
    studyPlanId: number
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'sections', sectionId], {
        body: sectionDetails
    });

export const removeCoursesFromStudyPlan = ({courseIds, studyPlanId}: {
    courseIds: number[];
    studyPlanId: number
}) =>
    api.delete<StudyPlan>([ENDPOINT, studyPlanId, 'courses'], {
        params: {
            courses: courseIds
        }
    });

export const deleteSection = ({studyPlanId, sectionId}: {
    studyPlanId: number;
    sectionId: number
}) =>
    api.delete<StudyPlan>([ENDPOINT, studyPlanId, 'sections', sectionId]);

export const linkPrerequisitesToCourse = ({studyPlanId, courseId, prerequisites, relation}: {
    studyPlanId: number;
    courseId: number;
    prerequisites: number[],
    relation: CourseRelation
}) =>
    api.post<StudyPlan>([ENDPOINT, studyPlanId, 'courses', courseId, 'prerequisites'], {
        params: {
            prerequisites,
            relation
        }
    });

export const unlinkPrerequisiteFromCourse = ({studyPlanId, courseId, prerequisiteId}: {
    studyPlanId: number;
    courseId: number;
    prerequisiteId: number
}) =>
    api.delete<StudyPlan>([ENDPOINT, studyPlanId, 'courses', courseId, 'prerequisites', prerequisiteId]);

export const linkCorequisitesToCourse = ({studyPlanId, courseId, corequisiteIds}: {
    studyPlanId: number;
    courseId: number;
    corequisiteIds: number[]
}) =>
    api.post<StudyPlan>([ENDPOINT, studyPlanId, 'courses', courseId, 'corequisites'], {
        params: {
            courses: corequisiteIds
        }
    });

export const unlinkCorequisiteFromCourse = ({studyPlanId, courseId, corequisiteId}: {
    studyPlanId: number;
    courseId: number;
    corequisiteId: number
}) =>
    api.delete<StudyPlan>([ENDPOINT, studyPlanId, 'courses', courseId, 'corequisites', corequisiteId]);

export const moveCoursesToSection = ({studyPlanId, courseIds, targetSectionId}: {
    studyPlanId: number;
    courseIds: number[];
    targetSectionId: number
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'sections', targetSectionId, 'move-courses'], {
        params: {
            courses: courseIds
        }
    });

export const moveSection = ({studyPlanId, sectionId, direction}: {
    studyPlanId: number;
    sectionId: number;
    direction: MoveDirection
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'sections', sectionId, 'move'], {params: {direction}});

export const resizeCoursePlacement = ({studyPlanId, courseId, span}: {
    studyPlanId: number;
    courseId: number;
    span: number;
}) =>
    api.put<StudyPlan>([ENDPOINT, studyPlanId, 'course-placements', courseId, 'resize'], {
        params: {
            span
        }
    });

export const placeCoursesInSemester = ({studyPlanId, targetPlacement, courseIds}: {
    studyPlanId: number;
    targetPlacement: CoursePlacement;
    courseIds: number[]
}) =>
    api.post<StudyPlan>([ENDPOINT, studyPlanId, 'course-placements'], {
        params: {courses: courseIds},
        body: targetPlacement
    });

export const removeCourseFromSemester = ({studyPlanId, courseId}: { studyPlanId: number; courseId: number }) =>
    api.delete<StudyPlan>([ENDPOINT, studyPlanId, 'course-placements', courseId]);
