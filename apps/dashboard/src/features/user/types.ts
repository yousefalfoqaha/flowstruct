export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
};

export const Role = {
  ADMIN: 'Admin',
  APPROVER: 'Approver',
  EDITOR: 'Editor',
  GUEST: 'Guest',
} as const;

export type UserAction =
  | 'study-plans:request-approval'
  | 'study-plans:approve'
  | 'users:read'
  | 'study-plans:delete'
  | 'courses:delete'
  | 'programs:delete';