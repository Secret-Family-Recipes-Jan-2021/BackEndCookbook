const db = require("../data/dbConfig")

async function add(user){
    const [id] = await db("users").insert(user)
        return findByUserId(id)
}

async function findByUserId(id){
    return await db("users")
        .select("username", "id", "password")
        .where("id", id)
}

async function findBy(username){
    return await db("users")
        .where("username", username)
        .first()
}

function findIt(username){
    return db("users")
        .select("id", "username", "password")
        .where(username)
}

function listUsers(){
    return db("users")
}

module.exports = {
    add,
    findBy,
    findByUserId,
    findIt,
    listUsers
}