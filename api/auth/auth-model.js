const db = require("../../data/dbConfig");

async function add(newUser) {
    const [ownerId] = await db("owners as o").insert(newUser, "ownerId")
    return findByUserId(ownerId)
}

async function findByUserId(ownerId){
    const user = await db("owners as o")
        .select("ownerId", "userName", "email", "location")
        .where("ownerId", ownerId)
        .first()
    return user
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
