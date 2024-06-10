// routes/handlers/historyPredictions.js
const express = require("express");
const router = express.Router();
const { HistoryPrediction } = require("../../models");

// GET all history predictions
router.get("/", async (req, res) => {
  try {
    const historyPredictions = await HistoryPrediction.findAll();
    res.json(historyPredictions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new history prediction
router.post("/", async (req, res) => {
  const { diseaseName, confidence, imageUrl } = req.body;

  try {
    const newPrediction = await HistoryPrediction.create({
      diseaseName,
      confidence,
      imageUrl,
    });
    res.status(201).json(newPrediction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
