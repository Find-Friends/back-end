const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const Users = require("../users/users-model.js");

const requiredRegistration = (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  if (username && password && firstName && lastName) {
    next();
  } else {
    res.status(400).json({
      message: "Username, password, first name, and last name are required!"
    });
  }
};

const requiredLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.status(400).json({
      message: "Username and password are required!"
    });
  }
};

//Required - username, password, firstName, lastName
//Optional - Age(int), gender, location, description
//RequiredRegistration - requeset without one of 4 required
//11:45 am works!
router.post("/register", requiredRegistration, (req, res) => {
  const creds = req.body;
  console.log(creds);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(creds.password, salt);

  Users.insert({ ...creds, password: hash })
    .then(user => {
      res.status(201).json({ message: "User created!" });
    })
    .catch(err => {
      res.status(500).json({ message: "", error: err });
    });
});

// Required - username and password
// RequiredLogin Middleware works - request without password
// Works at 11:49am
router.post("/login", requiredLogin, (req, res) => {
  const creds = req.body;

  Users.getBy({ username: creds.username })
    .then(user => {
      //Check if passwords are the same
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(202).json({
          message: "Correct Credentials!",
          token
        });
      } else {
        res.status(401).json({ message: "Incorrect Credentials!" });
        //Security Help: User will get incorrect credentials for wrong password or wrong username; user will not know which one.
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username
    // ...otherData
  };

  const options = {
    expiresIn: "1d" // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;
