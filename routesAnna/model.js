const db = require("../data/dbConfig")

async function add(user){
    console.log(user);

    const id = await db("users").insert(user);

    console.log(id[0]);
    return findByUserId(id[0]);
}

async function findByUserId(id){
    return await db("users")
        .select("username", "id", "password")
        .where("id", id)
        .first()
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
