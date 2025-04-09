import {MutationFunction, useMutation, UseMutationOptions, UseMutationResult} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {ErrorObject} from "@/shared/types.ts";
import {ReactElement} from "react";

type MessageOption<TData, TVariables> =
    | string
    | ((data: TData, variables: TVariables) => string);

type IconOption<TData, TVariables> =
    | ReactElement
    | ((data: TData, variables: TVariables) => ReactElement | undefined);

export function useAppMutation<
    TData = unknown,
    TError = ErrorObject,
    TVariables = void,
    TContext = unknown,
>(
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> & {
        successNotification?: {
            title?: MessageOption<TData, TVariables>;
            message: MessageOption<TData, TVariables>;
            icon?: IconOption<TData, TVariables>;
        };
    }
): UseMutationResult<TData, TError, TVariables, TContext> {
    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn,
        ...options,
        onSuccess: (data, variables, context) => {
            options?.onSuccess?.(data, variables, context);

            if (options?.successNotification) {
                const {
                    title = "Success!",
                    message,
                    icon,
                } = options.successNotification;

                const resolvedTitle = typeof title === "function" ? title(data, variables) : title;
                const resolvedMessage = typeof message === "function" ? message(data, variables) : message;
                const resolvedIcon = typeof icon === "function" ? icon(data, variables) : icon;

                notifications.show({
                    title: resolvedTitle,
                    message: resolvedMessage,
                    color: "green",
                    icon: resolvedIcon,
                });
            }
        },
        onError: (error, variables, context) => {
            notifications.show({
                title: "Error",
                message: (error as Error)?.message || "An unknown error occurred",
                color: "red",
            });

            options?.onError?.(error, variables, context);
        },
    });
}
