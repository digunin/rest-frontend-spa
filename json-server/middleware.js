module.exports = async (req, res, next) => {
  switch (req.path) {
    case "/dbreset":
      dbresetHandler(req, res, next);
      break;
    case "/login":
      loginHandler(req, res, next);
      break;
    case "/data":
      databaseHandler(req, res, next);
      break;
    default:
      next();
  }
};

const loginHandler = (req, res, next) => {
  const { username, password } = req.body;
  if (username === "user" && password === "password") {
    res.send({ token: "fake-token" });
  } else {
    res.status(403);
    res.end();
  }
};

const databaseHandler = (req, res, next) => {
  if (req.headers["x-auth"] === "fake-token") {
    next();
  } else {
    res.status(403);
    res.end();
  }
};

const dbresetHandler = (req, res, next) => {
  const db = req.app.db;
  db.get("data").remove().write();
  defaultData.forEach((row) => db.get("data").push(row).write());
  res.status(200);
  res.end();
};

const defaultData = [
  {
    companySigDate: "2022-12-23T11:19:27.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "1111",
    employeeSigDate: "2022-12-23T11:19:27.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48a",
  },
  {
    companySigDate: "2022-11-23T11:19:30.027Z",
    companySignatureName: "Приказ.sig",
    documentName: "Договор 2.pdf",
    documentStatus: "Подписан",
    documentType: "Приказ о приеме",
    employeeNumber: "2222",
    employeeSigDate: "2022-11-23T11:19:27.017Z",
    employeeSignatureName: "Приказ 2.sig",
    id: "ce4ab411-f895-400a-9599-db99a1c32174",
  },
  {
    companySigDate: "2022-10-23T11:19:25.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "3333",
    employeeSigDate: "2022-10-23T11:19:25.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48b",
  },
  {
    companySigDate: "2022-09-23T11:19:22.027Z",
    companySignatureName: "Приказ.sig",
    documentName: "Договор 2.pdf",
    documentStatus: "Подписан",
    documentType: "Приказ о приеме",
    employeeNumber: "4444",
    employeeSigDate: "2022-09-23T11:19:22.017Z",
    employeeSignatureName: "Приказ 2.sig",
    id: "ce4ab411-f895-400a-9599-db99a1c3217c",
  },
  {
    companySigDate: "2022-08-23T11:19:18.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "5555",
    employeeSigDate: "2022-08-23T11:19:18.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48d",
  },
];
