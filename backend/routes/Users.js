const express = require("express");
const router = express.Router();

const { authorization, createUser } = require("../services/Authentication");
const { ROLES } = require("../constants");
const authAdmin = authorization(ROLES.ADMIN);

const User = require("../models/User");

// BASIC URL /users

router.get("/staff", authAdmin, async (req, res) => {
  try {
    const staff = await User.find({ role: ROLES.STAFF });
    console.log(staff);
    res.status(200).json({
      data: staff.map((el) => ({
        id: el._id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        username: el.username,
        role: el.role,
      })),
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/staff", authAdmin, async (req, res) => {
  console.log("POST /users/staff");
  try {
    const { username, password, firstName, lastName, email } = req.body;

    const newUserRes = await createUser({
      username,
      password,
      firstName,
      lastName,
      email,
      role: ROLES.STAFF,
    });

    if (newUserRes.status !== 200)
      return res
        .status(newUserRes.status)
        .json({ message: newUserRes.message });

    const { user } = newUserRes;
    res.status(200).json({
      data: {
        id: user._id,
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.delete("/staff/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /users/staff/${id}`);
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.sendStatus(400);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
