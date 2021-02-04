const db = require("../data/dbConfig")

async function add(user){
    console.log(user);

    // await db("users")
    //     .insert(user, 'id')
    //     .then((result) => {
    //         console.log(result)
    //         return findByUserId(parseInt(result));
    //     });

    let [id] = await db("users")
        .insert(user, 'id');

    return findByUserId(id);
}

async function findByUserId(id){
    return await db("users")
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
