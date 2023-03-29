const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const refcodegen = require("../utils/refcodegen");

const prisma = require('../utils/prisma')


router.post(
    "/",
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

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + '/' + dd + '/' + yyyy;

          await prisma.$connect()

          var referralCodeExists = await refcodegen.checkReferralCodeExists(code);

          if(!referralCodeExists && code != "") throw new Error("Invalid Code")

          const entry = await prisma.pre_registration.create({
            data: {
              id: newID,
              name: name,
              email: email,
              discord: discord,
              socials: socials,
              sources: sources,
              referral: 0,
              code: code,
              date: today
            },
          })

          await refcodegen.incrementReferralCode(entry.code);
    
          res.json(entry);

        } catch (error) {
          console.error(error.message);
          res.status(500).send(error.message);
        }
      }
  );

  module.exports = router;