const express = require("express");
const router = express.Router();
const ctr = require("../../../controllers/user");
const guard = require("../../../helpers/guard");

const { validationCreateUser, validationUpdateUser } = require("./validation");

//user dane

router.post("/register", validationCreateUser, ctr.register);
router.post("/login", validationUpdateUser, ctr.login);
router.post("/logout", guard, ctr.logout);
router.get("/current", guard, ctr.current);

module.exports = router;
