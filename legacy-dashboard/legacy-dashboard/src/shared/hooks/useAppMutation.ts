import {MutationFunction, useMutation, UseMutationOptions, UseMutationResult} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {ErrorObject} from "@/shared/types.ts";

type SuccessMessageOption<TData, TVariables> =
    | string
    | ((data: TData, variables: TVariables) => string);

export function useAppMutation<
    TData = unknown,
    TError = ErrorObject,
    TVariables = void,
    TContext = unknown,
>(
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> & {
        successMessage?: SuccessMessageOption<TData, TVariables>;
    }
): UseMutationResult<TData, TError, TVariables, TContext> {
    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn,
        ...options,
        onSuccess: (data, variables, context) => {
            if (options?.successMessage) {
                const message = typeof options.successMessage === 'function'
                    ? options.successMessage(data, variables)
                    : options.successMessage;

                notifications.show({
                    title: "Success",
                    message,
                    color: "green"
                });
            }

            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            notifications.show({
                title: "Error",
                message: (error as Error)?.message || "An unknown error occurred",
                color: "red",
            });

            options?.onError?.(error, variables, context);
        }
    });
}
