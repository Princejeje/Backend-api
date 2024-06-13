const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserDataProfile = require("../../models").UserDataProfile;

// GET all user data profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await UserDataProfile.findAll();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific user data profile by userId
router.get("/:userId", async (req, res) => {
  try {
    const profile = await UserDataProfile.findByPk(req.params.userId);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user data profile
router.post("/", async (req, res) => {
  const { name, email, address, phoneNumber, password } = req.body;

  try {
    const newUserProfile = await UserDataProfile.create({
      name,
      email,
      address,
      phoneNumber,
      password,
    });
    res.status(201).json(newUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing user data profile
router.put("/:userId", async (req, res) => {
  const { name, email, address, phoneNumber } = req.body;

  try {
    const profile = await UserDataProfile.findByPk(req.params.userId);
    if (profile) {
      profile.name = name !== undefined ? name : profile.name;
      profile.email = email !== undefined ? email : profile.email;
      profile.address = address !== undefined ? address : profile.address;
      profile.phoneNumber =
        phoneNumber !== undefined ? phoneNumber : profile.phoneNumber;

      await profile.save();
      res.json(profile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) user password
router.put("/:userId/password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const profile = await UserDataProfile.findByPk(req.params.userId);
    if (profile) {
      const isMatch = await bcrypt.compare(oldPassword, profile.password);
      if (isMatch) {
        profile.password = newPassword;
        await profile.save();
        res.json({ message: "Password updated successfully" });
      } else {
        res.status(400).json({ message: "Old password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
