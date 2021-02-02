const db = require('../../../data/dbConfig');

const getAll = () => {
    return db.table('categories');
};

const getByID = (id) => {
    return db.table('categories')
        .where('id', id)
        .first();
}

const create = async (data) => {
    let [id] = await db.table('categories')
        .insert(data);

    return getByID(id);
}

const edit = async (id, data) => {
    let result = await db.table('categories')
        .where('id', id)
        .update(data);

    if (result) {
        return getByID(id);
    } else {
        return false;
    }
};

const remove = async (id) => {
    return db.table('categories')
        .where('id', id)
        .delete();
};

module.exports = {
    getAll,
    getByID,
    create,
    edit,
    remove
};
