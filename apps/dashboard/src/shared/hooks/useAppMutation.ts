import {
  DefaultError,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?:
        | Array<QueryKey>
        | ((data: unknown, variables: unknown, context: unknown) => Array<QueryKey>);
      removes?:
        | Array<QueryKey>
        | ((data: unknown, variables: unknown, context: unknown) => Array<QueryKey>);
      setData?: QueryKey | ((data: unknown, variables: unknown, context: unknown) => QueryKey);
      successMessage?:
        | string
        | ((data: unknown, variables: unknown, context: unknown) => string)
        | undefined;
    };
  }
}

interface AppMutationMeta<TData, TVariables, TContext> {
  invalidates?:
    | Array<QueryKey>
    | ((data: TData, variables: TVariables, context: TContext) => Array<QueryKey>);
  removes?:
    | Array<QueryKey>
    | ((data: TData, variables: TVariables, context: TContext) => Array<QueryKey>);
  setData?: QueryKey | ((data: TData, variables: TVariables, context: TContext) => QueryKey);
  successMessage?:
    | string
    | ((data: TData, variables: TVariables, context: TContext) => string)
    | undefined;
}

interface AppMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'meta'> {
  meta?: AppMutationMeta<TData, TVariables, TContext>;
}

export function useAppMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: AppMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    ...options,
    meta: options.meta as any,
  });
}
