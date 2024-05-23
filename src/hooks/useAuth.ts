import { useAppSelector } from "../store";

export const useAuth = () => {
  const { username, token } = useAppSelector((state) => state.userState);
  return {
    isAuth: !!token,
    username,
    token,
  };
};
