import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {loginUser} from "@/features/auth/api.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";

export const useLoginUser = () => {
    const {login} = useAuth();

    return useAppMutation(loginUser, {
        onSuccess: (data) => {
            login(data);
        }
    });
}
