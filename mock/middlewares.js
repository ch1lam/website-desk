const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (req, res, next) => {
  const SECRET_KEY = "mockData";
  const expiresIn = "1d";

  const createToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  };
  if (req.method === "POST" && req.path === "/login") {
    if ((req.body.username === "chilam") & (req.body.password === "123")) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Login Success",
        data: {
          username: req.body.username,
          token: createToken({
            uuid: crypto.randomUUID(),
            username: req.body.username,
          }),
        },
      });
    } else {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "The username or password error",
      });
    }
  }
  next();
};
