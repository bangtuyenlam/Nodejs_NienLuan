const express = require("express");
const router = express.Router();
const khachhangController = require("../controllers/KhachhangController");

router.post("/id", khachhangController.customerId);
router.get("/", khachhangController.customerList);

module.exports = router;