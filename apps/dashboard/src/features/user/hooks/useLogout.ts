import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {logoutUser} from "@/features/user/api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useAppMutation(logoutUser, {
        onSuccess: () => {
            navigate({to: '/login'}).then();
            queryClient.clear();
        },
        successNotification: {message: "You are logged out."}
    });
}