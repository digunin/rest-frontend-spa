module.exports = (req, res, next) => {
  if (req.path === "/login") loginHandler(req, res, next);
  else databaseHandler(req, res, next);
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
