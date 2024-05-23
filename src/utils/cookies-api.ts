import Cookies from "js-cookie";
import { CookieName } from "../api/types";

export const getCookies = (): { [key in CookieName]: string | null } => {
  return {
    username: getCookie("username") || null,
    token: getCookie("token") || null,
  };
};

export const setCookies = (cookies: { [key in CookieName]: string }) => {
  Object.keys(cookies).forEach((name) =>
    Cookies.set(name, cookies[name as CookieName])
  );
};

export const removeCookies = () => {
  removeCookie("username");
  removeCookie("token");
};

const removeCookie = (name: CookieName) => {
  Cookies.remove(name);
};

const getCookie = (name: CookieName) => Cookies.get(name);
