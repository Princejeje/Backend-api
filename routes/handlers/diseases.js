// routes/handlers/diseases.js
const express = require("express");
const router = express.Router();
const { Disease } = require("../../models");
const verifyToken = require("../../middlewares/verify-token");

// GET all diseases
router.get("/", verifyToken, async (req, res) => {
  try {
    const diseases = await Disease.findAll();
    res.json(diseases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new disease
router.post("/", verifyToken, async (req, res) => {
  const { photo, diseaseName, otherNames, description, causes, prevention } =
    req.body;

  try {
    const newDisease = await Disease.create({
      photo,
      diseaseName,
      otherNames,
      description,
      causes,
      prevention,
    });
    res.status(201).json(newDisease);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
