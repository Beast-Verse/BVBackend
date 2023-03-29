//Generates the unique referral code for the user
const prisma = require("../utils/prisma");

async function generateUniqueReferralCode() {
  const prefix = "BV-";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = prefix;

  for (let i = 0; i < 7; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Check if the referral code already exists in the database
  const referralCodeExists = await checkReferralCodeExists(referralCode);

  if (referralCodeExists) {
    // If the referral code already exists, generate a new one
    return generateUniqueReferralCode();
  } else {
    // If the referral code does not exist, return it
    return referralCode;
  }
}

// Check if the referral code already exists in the database
async function checkReferralCodeExists(referralCode) {
  try {
    const document = await prisma.pre_registration.findUnique({
      where: {
        id: referralCode,
      },
    });
    return !!document;
  } catch (error) {
    console.log(`Error checking if ID exists: ${error.message}`);
    return false;
  }
}

//function to increment count of referral code if id exists
async function incrementReferralCode(referralCode) {
  const referralCodeCount = prisma.pre_registration
    .update({
      where: {
        id: referralCode,
      },
      data: {
        referral: {
          increment: 1,
        },
      },
    })
    .then((docs) => {
      return true;
    })
    .catch((error) => {
      console.log("Error: ", error);
      return false;
    });
}

module.exports = {
  generateUniqueReferralCode,
  checkReferralCodeExists,
  incrementReferralCode,
};
