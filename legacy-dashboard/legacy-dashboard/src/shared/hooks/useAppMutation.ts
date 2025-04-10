import {MutationFunction, useMutation, UseMutationOptions} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {ErrorObject, Notification} from "@/shared/types.ts";

interface AppMutationOptions<TData, TError, TVariables, TContext> extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> {
    successNotification?: Notification<TData, TVariables>;
}

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
                message: (error as ErrorObject)?.message || "An unknown error occurred",
                color: "red",
            });

            options?.onError?.(error, variables, context);
        },
    });
}
