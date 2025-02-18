"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import Cookies from "js-cookie";
import { setCredentials } from './state/api/authSlice';
import { useAppDispatch } from "@/hooks/hooks";

const AuthWatcher = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSelector((state: RootState) => state.root.auth.user);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const isAdminRoute = pathname?.startsWith('/admin');
  const isLoginPage = pathname === '/auth/login';

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (refreshToken && !auth) {
      const user = "admin";
      dispatch(setCredentials({
        user,
      }));
    }

    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      if (isAdminRoute && !auth && !Cookies.get('access_token')) {
        router.push('/auth/login');
      }
      
      if (isLoginPage && auth) {
        router.push('/admin');
      }
    }
  }, [auth, router, isInitialized, isAdminRoute, isLoginPage]);
  
  if (!isInitialized && isAdminRoute) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthWatcher;