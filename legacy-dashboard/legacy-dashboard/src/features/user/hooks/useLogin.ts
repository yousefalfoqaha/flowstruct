import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {loginUser} from "@/features/user/api.ts";

export const useLogin = () => {
    return useAppMutation(loginUser, {
        successNotification: {message: 'You are logged in.'}
    });
}
