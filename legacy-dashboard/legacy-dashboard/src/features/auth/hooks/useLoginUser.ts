import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {loginUser} from "@/features/auth/api.ts";
import Cookies from "js-cookie";

export const useLoginUser = () => {
    return useAppMutation(loginUser, {
        onSuccess: (data) => {
            Cookies.set('token', data);
        }
    });
}
