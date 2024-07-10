const jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // this is username you're encoding in the JWT
    expiresIn: "7d", // specifies the token will expire in 7 days
    algorithm: "HS256", // this is the algorithm used to "sign" or encode the values of the JWT
  });
};

/* POST login */
module.exports = (router) => {
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        res.setHeader("Access-Control-Allow-Origin", "*"); // Will ensure CORS headers are set
        return res.status(400).json({
          message: "Something is not right",
          user: user,
          error: error,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res, next);
  });
};
