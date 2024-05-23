import { getCookies } from "../utils/cookies-api";
import { useAppSelector } from "../store";

export const useAuth = () => {
  const { username, token } = useAppSelector((state) => state.userState);
  const cookies = getCookies();
  return {
    isAuth: !!token || !!cookies.token,
    username: username || cookies.username,
    token: token || cookies.token,
  };
};
