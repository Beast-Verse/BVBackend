const prisma = require("./prisma")

const addData = async(data)=>{
    await prisma.$connect()
    const entry = await prisma.table.create(
        {
            data:data
        }
    )
    return entry
}

module.exports = addData