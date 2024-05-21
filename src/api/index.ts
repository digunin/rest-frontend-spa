import { FakeAPI } from "./fake-crudAPI";
import { crudAPI } from "./crudAPI";

const isProdMode = process.env.NODE_ENV === "production";
const api = isProdMode ? crudAPI : FakeAPI;
export default api;
