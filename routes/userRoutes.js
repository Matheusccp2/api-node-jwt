const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const userController = require("../controllers/userController");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/:id", validateObjectId("id"), checkToken, userController.getUser);

module.exports = router;
