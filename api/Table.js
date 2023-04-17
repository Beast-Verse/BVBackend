const Router = require("express").Router()
const addData = require("../utils/addData.js")


Router.post("/", async(req,res)=>{
    
    const { walletID , total_supply , com } = req.body
    if(!walletID || !total_supply || !com){
        res.status(404).send("Please provide all the information")
    }else{
        const result = await addData({
            walletID:walletID,
            total_supply:total_supply,
            com:com
        })

        res.status(200).send("Added successfully")
    }
})

module.exports = Router