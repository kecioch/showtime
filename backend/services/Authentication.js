const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;

const User = require("../models/User");

exports.login = async (req, res) => {
  console.log("POST /authentication/login");
  try {
    const { username, password } = req.body;
    let token = null;
    const user = await User.findOne({ username });
    console.log("USER:", user);

    if (username && password && user) {
      console.log("CHECK CREDENTIALS");

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        token = jwt.sign(
          {
            user: {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          },
          privateKey
        );
        console.log("TOKEN:", token);
      }
    }

    if (token) return res.json({ status: 200, token });
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err });
  }
};

exports.register = async (req, res) => {
  console.log("POST /authentication/register");
  try {
    const { username, password, firstName, lastName, email } = req.body;
    let foundUser = await User.findOne({
      username: { $regex: new RegExp(username, "i") },
    });

    if (foundUser)
      return res
        .status(400)
        .json({ status: 400, message: "Benutzername existiert bereits" });

    foundUser = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (foundUser)
      return res
        .status(400)
        .json({ status: 400, message: "E-Mail existiert bereits" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        user: {
          username: savedUser.username,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
        },
      },
      privateKey
    );
    console.log("TOKEN:", token);

    return res.json({ status: 200, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, message: err._message });
  }
};

exports.verifyToken = (req, res, next) => {
  req.user = { username: null, verified: false };
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, privateKey, (err, data) => {
      if (!err && data) {
        req.user = { ...data.user, verified: true };
        next();
      } else {
        return res.sendStatus(403);
      }
    });
  } else return res.sendStatus(403);
};
