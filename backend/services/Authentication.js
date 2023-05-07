const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;

const User = require("../models/User");
const { ROLES } = require("../constants");

const findUser = async (user) => {
  if (!user || (!user.username && !user.email)) return null;

  let searchParams = {};
  if (user.username)
    searchParams.username = { $regex: new RegExp(`^${user.username}$`, "i") };
  if (user.email)
    searchParams.email = { $regex: new RegExp(`^${user.email}$`, "i") };

  const foundUser = await User.findOne(searchParams);
  return foundUser;
};

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
              role: user.role,
            },
          },
          privateKey
        );
        console.log("TOKEN:", token);
      }
    }

    if (token) {
      return res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        });
    }
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err });
  }
};

exports.logout = async (req, res) => {
  return res.clearCookie("auth_token").sendStatus(200);
};

exports.createUser = async (user) => {
  const { username, password, firstName, lastName, email, role } = user;

  let foundUser = await findUser({ username });
  if (foundUser)
    return { status: 400, message: "Benutzername ist bereits vergeben" };

  foundUser = await findUser({ email });
  if (foundUser) return { status: 400, message: "E-Mail ist bereits vergeben" };

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    email,
    role,
  });
  const savedUser = await newUser.save();

  return { status: 200, user: savedUser };
};

exports.register = async (req, res) => {
  console.log("POST /authentication/register");
  try {
    const { username, password, firstName, lastName, email } = req.body;

    // let foundUser = await findUser({ username });
    // console.log("found", foundUser);

    // if (foundUser)
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: "Benutzername ist bereits vergeben" });

    // foundUser = await findUser({ email });

    // if (foundUser)
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: "E-Mail ist bereits vergeben" });

    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // const newUser = new User({
    //   username,
    //   password: hashedPassword,
    //   firstName,
    //   lastName,
    //   email,
    //   role: ROLES.USER,
    // });
    // const savedUser = await newUser.save();

    const newUserRes = await createUser({
      username,
      password,
      firstName,
      lastName,
      email,
      role: ROLES.USER,
    });

    if (newUserRes.status !== 200)
      return res
        .status(newUserRes.status)
        .json({ status: newUserRes.status, message: newUserRes.message });

    const userInfo = {
      username: newUserRes.user.username,
      firstName: newUserRes.user.firstName,
      lastName: newUserRes.user.lastName,
      email: newUserRes.user.email,
      role: newUserRes.user.role,
    };

    const token = jwt.sign(
      {
        user: userInfo,
      },
      privateKey
    );
    console.log("TOKEN:", token);

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ status: 200, user: userInfo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, message: err._message });
  }
};

exports.authorization = (role) => {
  return (req, res, next) => {
    try {
      console.log("AUTH");
      const token = req.cookies.auth_token;
      console.log("REQ.COOKIE", req.cookies);

      console.log("CHECK AUTHORIZATION TOKEN", token);
      if (!token) return res.sendStatus(403);

      const data = jwt.verify(token, privateKey);
      req.user = data.user;
      console.log("REQ.USER", req.user);

      if (role && req.user.role !== role) return res.sendStatus(403);

      return next();
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  };
};

exports.update = async (req, res) => {
  try {
    const userCookie = req.user;
    const update = req.body;
    console.log("UPDATE USER", userCookie);
    console.log("UPDATED USER", update);

    const user = await findUser({ username: userCookie.username });
    console.log("FOUND USER", user);
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "Benutzer nicht gefunden" });

    console.log("update.username", update.username);
    const test = await findUser({ username: update.username });
    console.log("test", test);
    if (user.username !== update.username && test)
      return res
        .status(400)
        .json({ status: 400, message: "Benutzername ist bereits vergeben" });

    if (
      user.email !== update.email &&
      (await findUser({ email: update.email }))
    )
      return res
        .status(400)
        .json({ status: 400, message: "Email ist bereits vergeben" });

    user.firstName = update.firstName;
    user.lastName = update.lastName;
    user.username = update.username;
    user.email = update.email;

    if (update.password && update.password.length > 0)
      user.password = await bcrypt.hash(update.password, saltRounds);

    const savedUser = await user.save();
    const userInfo = {
      username: savedUser.username,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      role: savedUser.role,
    };

    const token = jwt.sign(
      {
        user: userInfo,
      },
      privateKey
    );

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ status: 200, message: "OK", user: userInfo });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
