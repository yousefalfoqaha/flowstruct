import {CoursePrerequisite, MoveDirection, Section, StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";

export const getStudyPlanListRequest = async (programId: number) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans?program=${programId}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlanListItem[];
}

export const getStudyPlanRequest = async (studyPlanId: number) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }
    return await res.json() as StudyPlan;
};

export const createStudyPlanRequest = async (
    {createdStudyPlanDetails, programId}: { createdStudyPlanDetails: Partial<StudyPlan>, programId: number }) => {
    const res = await fetch('http://localhost:8080/api/v1/study-plans', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...createdStudyPlanDetails, program: programId})
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlanListItem;
};

export const toggleStudyPlanVisibilityRequest = async (toggledStudyPlan: Partial<StudyPlan>) => {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${toggledStudyPlan?.id}/toggle-visibility`, {
        method: 'PUT'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred.');
    }
};

export const deleteStudyPlanRequest = async (deletedStudyPlan: Partial<StudyPlan>) => {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${deletedStudyPlan.id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete study plan");
    }
};

export const updateStudyPlanDetailsRequest = async (
    {studyPlanId, updatedStudyPlanDetails}: { studyPlanId: number; updatedStudyPlanDetails: Partial<StudyPlan> }) => {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedStudyPlanDetails),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update study plan");
    }

    return await response.json() as Partial<StudyPlan>;
}

export const createSectionRequest = async (
    {studyPlanId, newSectionDetails}: { studyPlanId: number, newSectionDetails: Partial<Section> }
) => {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/create-section`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newSectionDetails)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await response.json() as StudyPlan;
};

export const addCoursesToSectionRequest = async ({addedCourses, sectionId, studyPlanId}: {
    addedCourses: Course[],
    sectionId: number,
    studyPlanId: number
}) => {
    const response = await fetch(
        `http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${sectionId}/courses`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({courseIds: addedCourses.map(c => c.id)}),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred.");
    }

    return await response.json() as StudyPlan;
};

export const editSectionDetailsRequest = async ({updatedSectionDetails, sectionId, studyPlanId}: {
    updatedSectionDetails: Partial<Section>,
    sectionId: number,
    studyPlanId: number
}) => {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${sectionId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedSectionDetails)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await response.json() as StudyPlan;
};

export const removeCoursesFromSectionRequest = async ({courseIds, studyPlanId}: {
    courseIds: number[],
    studyPlanId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/by-ids?courses=${courseIds}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
};

export const deleteSectionRequest = async ({studyPlanId, sectionId}: {
    studyPlanId: number,
    sectionId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${sectionId}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const assignCoursePrerequisitesRequest = async ({studyPlanId, courseId, prerequisites}: {
    studyPlanId: number,
    courseId: number,
    prerequisites: CoursePrerequisite[]
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/${courseId}/prerequisites`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(prerequisites)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const removeCoursePrerequisiteRequest = async ({studyPlanId, courseId, prerequisiteId}: {
    studyPlanId: number,
    courseId: number,
    prerequisiteId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/${courseId}/prerequisites/${prerequisiteId}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const assignCourseCorequisitesRequest = async ({studyPlanId, courseId, corequisites}: {
    studyPlanId: number,
    courseId: number,
    corequisites: number[]
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/${courseId}/corequisites`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(corequisites)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const removeCourseCorequisiteRequest = async ({studyPlanId, courseId, corequisiteId}: {
    studyPlanId: number,
    courseId: number,
    corequisiteId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/${courseId}/corequisites/${corequisiteId}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const moveCourseSectionRequest = async ({studyPlanId, courseId, sectionId}: {
    studyPlanId: number,
    courseId: number,
    sectionId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/courses/${courseId}/move-to-section/${sectionId}`, {
        method: 'PUT'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const moveSectionRequest = async ({studyPlanId, sectionId, direction}: {
    studyPlanId: number,
    sectionId: number,
    direction: MoveDirection
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${sectionId}/move?direction=${direction}`, {
        method: 'PUT'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const addCoursesToSemesterRequest = async ({studyPlanId, semester, courseIds}: {
    studyPlanId: number,
    semester: number,
    courseIds: number[]
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/course-placements`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({semester: semester, courseIds: courseIds})
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}

export const removeCoursePlacementRequest = async ({studyPlanId, courseId}: {
    studyPlanId: number,
    courseId: number
}) => {
    const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/course-placements/${courseId}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return await res.json() as StudyPlan;
}