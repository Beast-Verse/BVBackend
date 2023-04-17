const prisma = require("../utils/prisma")
const Router = require("express").Router()

Router.get("/" , async(req, res)=>{
    const table = await prisma.table.find({})
    res.status(200).json(table)
})

module.exports = Router