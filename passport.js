const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, callback) => {
      console.log("Attempting login with username:" + username);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("Incorrect username");
            return callback(null, false, {
              message: "Incorrect username or password.",
            });
          }
          if (!user.validatePassword(password)) {
            console.log("Incorrect password");
            return callback(null, false, { message: "Incorrect password." });
          }
          console.log("Login successful");
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log("Error during authentication");
            return callback(error);
          }
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    async (jwtPayload, callback) => {
      console.log("Extracting user from JWT");
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          if (!user) {
            return callback(null, false, { message: "User not found" });
          }
          return callback(null, user);
        })
        .catch((error) => {
          console.log("Error extracting user from JWT", error);
          return callback(error);
        });
    }
  )
);
