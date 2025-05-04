import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {loginUser} from "@/features/auth/api.ts";

export const useLoginUser = () => {
    return useAppMutation(loginUser, {
        onSuccess: (data) => {

        }
    })
}