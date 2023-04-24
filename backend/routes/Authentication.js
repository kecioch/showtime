const express = require("express");
const router = express.Router();

const { login, register, verifyToken } = require("../services/Authentication");

// BASIC URL /authentication

router.post("/login", login);
router.post("/register", register);
router.get("/protected", verifyToken, (req,res) => {
    res.json({user: req.user, message: "THIS IS SUPER SECRET!"});
});


module.exports = router;
