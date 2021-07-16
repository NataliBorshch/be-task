const express = require("express");
const router = express.Router();
const ctr = require("../../../controllers/user");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { validationCreateUser, validationUpdateUser } = require("./validation");

router.post("/register", validationCreateUser, ctr.register);
router.post("/login", validationUpdateUser, ctr.login);
router.post("/logout", guard, ctr.logout);
router.get("/current", guard, ctr.current);
router.patch("/avatars", guard, upload.single("avatars"), ctr.avatars);

module.exports = router;