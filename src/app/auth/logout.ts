import { logout } from "@/state/api/authSlice";
import Cookies from "js-cookie";
import { AppDispatch } from "@/state/store";

export const logoutUser = (dispatch: AppDispatch) => {
    console.log("Logging out...");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    dispatch(logout());
    window.location.href = "/auth/login";
};
