import { HTTPMethods } from "./types";
import prod_mode from "../utils/isProdMode";

const url_prod_mode = {
  HOST_URL: process.env.HOST_URL as string,
  LOGIN_URL: process.env.LOGIN_URL as string,
  READ_URL: process.env.READ_URL as string,
  CREATE_URL: process.env.CREATE_URL as string,
  UPDATE_URL: process.env.UPDATE_URL as string,
  DEETE_URL: process.env.DEETE_URL as string,
};

const url_dev_mode = {
  HOST_URL: "http://localhost:3300",
  LOGIN_URL: "login",
  READ_URL: "data",
  CREATE_URL: "data",
  UPDATE_URL: "data",
  DEETE_URL: "data",
};

const prod_http_methods: { [key in HTTPMethods]: HTTPMethods } = {
  GET: "GET",
  POST: "POST",
  PUT: "POST",
  DELETE: "POST",
};

const dev_http_methods: { [key in HTTPMethods]: HTTPMethods } = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const urls = prod_mode ? url_prod_mode : url_dev_mode;
export const http_methods = prod_mode ? prod_http_methods : dev_http_methods;
