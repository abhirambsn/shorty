const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  deleteUser,
  modifyUser,
  createUrl,
  deleteUrl,
  getUrls,
  getUrlById,
  modifyUrl,
} = require("../controllers/manage");

const middleware = require('../middleware/auth')

router.get("/user", middleware, getProfile); // Get Profile (Middleware Y)
router.post("/user", registerUser); // New User
router.post("/user/login", loginUser)
router.put("/user", middleware, modifyUser); // Modify Profile
router.delete("/user", middleware, deleteUser); // Delete Account

router.get("/urls", middleware, getUrls); // Return all urls shortened by the user (Middleware Y)
router.post("/urls", middleware, createUrl); // Create new shortened url (Middleware Y)
router.get("/urls/:url_id", middleware, getUrlById);
router.put("/urls/:url_id", middleware, modifyUrl); // Modify Shortened Url (Middleware Y)
router.delete("/urls/:url_id", middleware, deleteUrl); // Delete a Shortened Url (Middleware Y)

module.exports = router;
