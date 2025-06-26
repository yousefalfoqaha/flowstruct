import { queryOptions } from '@tanstack/react-query';
import { getMe, getUserList } from '@/features/user/api.ts';

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const MeQuery = queryOptions({
  queryKey: userKeys.me(),
  queryFn: () => getMe(),
});

export const UserListQuery = queryOptions({
  queryKey: userKeys.list(),
  queryFn: () => getUserList(),
});
