import { http, HttpResponse, PathParams } from "msw";
import { urls } from "../api/urls";
import {
  Credentials,
  fakeCredentials,
  fakeToken,
  SingleRecord,
} from "../api/types";
import { mocked_read_response_data } from "../utils/mock.fetch";
import { nanoid } from "nanoid";

const data = [...mocked_read_response_data];

const { HOST_URL, LOGIN_URL, READ_URL, CREATE_URL, UPDATE_URL, DELETE_URL } =
  urls;

const getURLWithHost = (host: string) => (path: string) => `${host}/${path}`;

const getURL = getURLWithHost(HOST_URL);

const loginURL = getURL(LOGIN_URL);
const readURL = getURL(READ_URL);
const createURL = getURL(CREATE_URL);
const updateURL = getURL(`${UPDATE_URL}/:id`);
const deleteURL = getURL(`${DELETE_URL}/:id`);

const isAuth = (request: Request) => {
  const token = request.headers.get("x-auth");
  return token === fakeToken;
};

export const handlers = [
  http.post<PathParams<any>, Credentials>(loginURL, async ({ request }) => {
    const { username, password } = await request.json();
    if (
      username === fakeCredentials.username &&
      password === fakeCredentials.password
    ) {
      return HttpResponse.json({
        token: "fake-token",
      });
    }
    return new HttpResponse(null, { status: 403 });
  }),

  http.get(readURL, ({ request }) => {
    if (!isAuth(request)) return new HttpResponse(null, { status: 403 });
    return HttpResponse.json(data);
  }),

  http.post<PathParams<any>, SingleRecord>(createURL, async ({ request }) => {
    if (!isAuth(request)) return new HttpResponse(null, { status: 403 });
    const row = await request.json();
    const newRow = { ...row, id: nanoid() };
    data.push(newRow);
    return HttpResponse.json(newRow);
  }),

  http.put<{ id: string }, SingleRecord>(
    updateURL,
    async ({ request, params }) => {
      if (!isAuth(request)) return new HttpResponse(null, { status: 403 });
      const row = await request.json();
      const id = params.id;
      let index = data.findIndex((row) => row.id === id);
      const editingRow = { ...row, id };
      data[index] = editingRow;
      return HttpResponse.json(editingRow);
    }
  ),

  http.delete<{ id: string }, SingleRecord>(
    deleteURL,
    ({ request, params }) => {
      if (!isAuth(request)) return new HttpResponse(null, { status: 403 });
      const id = params.id;
      const index = data.findIndex((row) => row.id === id);
      data.splice(index, 1);
      return HttpResponse.json(null);
    }
  ),
];
