const express = require("express");
const router = express.Router();

const { login, register, authorization, logout, update } = require("../services/Authentication");
const {ROLES} = require("../constants");
const auth = authorization();
const authAdmin = authorization(ROLES.ADMIN);

// BASIC URL /authentication

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/update", auth, update);
router.get("/protected", auth, (req,res) => {
    res.json({user: req.user, message: "THIS IS SUPER SECRET!"});
});
router.get("/admin", authAdmin, (req,res) => {
    res.json({user: req.user, message: "ONLY ADMINS!"});
});


module.exports = router;
