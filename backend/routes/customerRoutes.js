const express = require("express");
const router = express.Router();
const { getCustomers } = require("../controllers/customerController");

// Route for fetching customers
router.get("/customers", getCustomers);

module.exports = router;
