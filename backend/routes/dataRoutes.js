const express = require("express");
const router = express.Router();
const Data = require("../models/dataModel");

router.get("/data", async (req, res) => {
  try {
    const allData = await Data.find();

    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve data" });
  }
});

module.exports = router;
