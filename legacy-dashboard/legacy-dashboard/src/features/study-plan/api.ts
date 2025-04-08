import {CoursePrerequisite, MoveDirection, Section, StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {api} from "@/shared/api.ts";

const ENDPOINT = '/study-plans';

export const getStudyPlanList = (programId: number) =>
    api.get<StudyPlanListItem[]>(ENDPOINT, {params: {program: programId}});

export const getStudyPlan = (studyPlanId: number) =>
    api.get<StudyPlan>(`${ENDPOINT}/${studyPlanId}`);

export const createStudyPlan = ({createdStudyPlanDetails, programId,}: {
    createdStudyPlanDetails: Partial<StudyPlan>;
    programId: number;
}) =>
    api.post<StudyPlanListItem>(ENDPOINT, {
        body: {...createdStudyPlanDetails, program: programId},
    });

export const toggleStudyPlanVisibility = (studyPlanId: number) =>
    api.put<Partial<StudyPlan>>(`${ENDPOINT}/${studyPlanId}/toggle-visibility`);

export const deleteStudyPlan = (deletedStudyPlan: Partial<StudyPlan>) =>
    api.delete(`${ENDPOINT}/${deletedStudyPlan.id}`);

export const updateStudyPlanDetails = ({studyPlanId, updatedStudyPlanDetails,}: {
    studyPlanId: number;
    updatedStudyPlanDetails: Partial<StudyPlan>;
}) =>
    api.put<Partial<StudyPlan>>(`${ENDPOINT}/${studyPlanId}`, {
        body: updatedStudyPlanDetails,
    });

export const createSection = ({studyPlanId, newSectionDetails,}: {
    studyPlanId: number;
    newSectionDetails: Partial<Section>;
}) =>
    api.put<StudyPlan>(`${ENDPOINT}/${studyPlanId}/create-section`, {
        body: newSectionDetails,
    });

export const addCoursesToSection = ({addedCourses, sectionId, studyPlanId}: {
    addedCourses: Course[];
    sectionId: number;
    studyPlanId: number;
}) =>
    api.post<StudyPlan>(`${ENDPOINT}/${studyPlanId}/sections/${sectionId}/courses`, {
        body: {courseIds: addedCourses.map(c => c.id)},
    });

export const editSectionDetails = ({updatedSectionDetails, sectionId, studyPlanId}: {
    updatedSectionDetails: Partial<Section>;
    sectionId: number;
    studyPlanId: number;
}) =>
    api.put<StudyPlan>(`${ENDPOINT}/${studyPlanId}/sections/${sectionId}`, {
        body: updatedSectionDetails,
    });

export const removeCoursesFromSection = ({courseIds, studyPlanId}: {
    courseIds: number[];
    studyPlanId: number;
}) =>
    api.delete<StudyPlan>(`${ENDPOINT}/${studyPlanId}/courses/by-ids`, {
        params: {courses: courseIds},
    });

export const deleteSection = ({studyPlanId, sectionId}: {
    studyPlanId: number;
    sectionId: number;
}) =>
    api.delete<StudyPlan>(`${ENDPOINT}/${studyPlanId}/sections/${sectionId}`);

export const assignCoursePrerequisites = ({studyPlanId, courseId, prerequisites}: {
    studyPlanId: number;
    courseId: number;
    prerequisites: CoursePrerequisite[];
}) =>
    api.post<StudyPlan>(
        `${ENDPOINT}/${studyPlanId}/courses/${courseId}/prerequisites`,
        {body: prerequisites}
    );

export const removeCoursePrerequisite = ({studyPlanId, courseId, prerequisiteId}: {
    studyPlanId: number;
    courseId: number;
    prerequisiteId: number;
}) =>
    api.delete<StudyPlan>(
        `${ENDPOINT}/${studyPlanId}/courses/${courseId}/prerequisites/${prerequisiteId}`
    );

export const assignCourseCorequisites = ({studyPlanId, courseId, corequisites}: {
    studyPlanId: number;
    courseId: number;
    corequisites: number[];
}) =>
    api.post<StudyPlan>(`${ENDPOINT}/${studyPlanId}/courses/${courseId}/corequisites`, {
        body: corequisites,
    });

export const removeCourseCorequisite = ({studyPlanId, courseId, corequisiteId}: {
    studyPlanId: number;
    courseId: number;
    corequisiteId: number;
}) =>
    api.delete<StudyPlan>(
        `${ENDPOINT}/${studyPlanId}/courses/${courseId}/corequisites/${corequisiteId}`
    );

export const moveCourseSection = ({studyPlanId, courseId, sectionId}: {
    studyPlanId: number;
    courseId: number;
    sectionId: number;
}) =>
    api.put<StudyPlan>(`${ENDPOINT}/${studyPlanId}/courses/${courseId}/move-to-section/${sectionId}`);

export const moveSection = ({studyPlanId, sectionId, direction}: {
    studyPlanId: number;
    sectionId: number;
    direction: MoveDirection;
}) =>
    api.put<StudyPlan>(`${ENDPOINT}/${studyPlanId}/sections/${sectionId}/move`, {
        params: {direction},
    });

export const addCoursesToSemester = ({studyPlanId, semester, courseIds}: {
    studyPlanId: number;
    semester: number;
    courseIds: number[];
}) =>
    api.post<StudyPlan>(`${ENDPOINT}/${studyPlanId}/course-placements`, {
        body: {semester, courseIds},
    });

export const removeCoursePlacement = ({studyPlanId, courseId}: {
    studyPlanId: number;
    courseId: number;
}) =>
    api.delete<StudyPlan>(`${ENDPOINT}/${studyPlanId}/course-placements/${courseId}`);
