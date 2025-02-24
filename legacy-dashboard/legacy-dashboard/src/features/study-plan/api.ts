import {Section, StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
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