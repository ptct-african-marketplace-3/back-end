const db = require("../../data/dbConfig");
async function add(newUser) {
    const [ownerId] = await db("owners as o").insert(newUser)
    return findByUserId(ownerId)
}

function findByUserId(ownerId){
    return db("owners as o").select("*").where("ownerId", ownerId).first()
}

function findByUserName(userName) {
    return db("owners")
        .select("*")
        .where("userName", userName)
        .first()
}

module.exports = {
    add,
    findByUserId,
    findByUserName
}
