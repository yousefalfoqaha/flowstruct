import { atom } from 'nanostores';
import type { StudyPlan } from "../types";

export const $studyPlan = atom<StudyPlan | null>(null);

export async function fetchStudyPlan(id: number) {
    const response = await fetch(`http://localhost:8080/api/v1/study-plans/${id}`);
    const data = await response.json();
    $studyPlan.set(data);
}