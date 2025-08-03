export type PublishRequest = {
  id: number;
  status: string;
  message: string;
  programs: number[];
  studyPlans: number[];
  courses: number[];
  requestedAt: Date;
  requestedBy: number;
};
