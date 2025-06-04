import { MutationFunction, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ErrorObject, Notification } from '@/shared/types.ts';
import { Check, X } from 'lucide-react';
import React, { ReactElement } from 'react';

interface AppMutationOptions<TData, TError, TVariables, TContext>
  extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> {
  successNotification?: Notification<TData, TVariables>;
}

const ICON_SIZE = 18;

export function useAppMutation<
  TData = unknown,
  TError = ErrorObject,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: AppMutationOptions<TData, TError, TVariables, TContext>
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      if (options?.successNotification) {
        const {
          title = 'Success!',
          message,
          icon = React.createElement(Check),
        } = options.successNotification;

        const resolvedTitle = typeof title === 'function' ? title(data, variables) : title;
        const resolvedMessage = typeof message === 'function' ? message(data, variables) : message;
        const resolvedIcon = React.cloneElement(
          typeof icon === 'function' ? (icon(data, variables) as ReactElement) : icon,
          { size: ICON_SIZE }
        );

        notifications.show({
          title: resolvedTitle,
          message: resolvedMessage,
          color: 'green',
          icon: resolvedIcon,
          withBorder: true,
        });
      }
    },
    onError: (error, variables, context) => {
      const errorObject = error as ErrorObject;

      errorObject.messages.forEach((message) => {
        notifications.show({
          title: 'Error...',
          message: message || 'An unknown error occurred',
          color: 'red',
          icon: React.createElement(X, { size: ICON_SIZE }),
          withBorder: true,
        });
      });

      options?.onError?.(error, variables, context);
    },
  });
}
