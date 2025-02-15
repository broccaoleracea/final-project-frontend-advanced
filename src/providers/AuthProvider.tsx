import { FC, ReactNode, useEffect } from 'react';
import {useRefreshMutation} from "@/state/api/authApi";
import {logout, setCredentials} from "@/state/api/authSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";

interface Props {
    children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();
    const refreshToken = useAppSelector((state) => state.auth.refreshToken);
    const [refresh] = useRefreshMutation();

    useEffect(() => {
        const initAuth = async () => {
            const storedRefreshToken = localStorage.getItem('refreshToken');

            if (storedRefreshToken && !refreshToken) {
                try {
                    const result = await refresh({ refreshToken: storedRefreshToken }).unwrap();
                    dispatch(setCredentials(result));
                } catch {
                    dispatch(logout());
                }
            }
        };

        initAuth();
    }, []);

    return (
        <>
            {children}
        </>
    );
};
