const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const { body, validationResult } = require("express-validator");
const refcodegen = require("../refcodegen");


router.post(
    "/addwaitlist",
    [
        body('name' , "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail()
    ],
    //scync function to add a new entry to the waitlist
    async (req, res) => {
        try {
          const { name, email, discord, socials, sources, code } = req.body;
          // Simple validation
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const newID = await refcodegen.generateUniqueReferralCode();
          console.log("New ID Generated: ", newID);

    
          const entry = new Waitlist({
            _id: newID,
            name,
            email,
            discord,
            socials,
            sources,
            code
          });

          await refcodegen.incrementReferralCode(entry.code);

          const newEntry = await entry.save();

          res.json(newEntry);
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
  );

  module.exports = router;