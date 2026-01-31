const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const userController = require("../controllers/userController");

router.get("/:id", checkToken, userController.getUser);

module.exports = router;