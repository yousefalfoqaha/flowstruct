import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {SectionLevel, SectionType} from "@/state/activeStudyPlan.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLevelLabel = (level: SectionLevel): string => {
  switch (level) {
    case SectionLevel.UNIVERSITY:
      return "University";
    case SectionLevel.SCHOOL:
      return "School";
    case SectionLevel.PROGRAM:
      return "Program";
    default:
      return level;
  }
};

export const getTypeLabel = (type: SectionType): string => {
  switch (type) {
    case SectionType.REQUIREMENT:
      return "Requirement";
    case SectionType.ELECTIVE:
      return "Elective";
    case SectionType.REMEDIAL:
      return "Remedial";
    default:
      return type;
  }
};