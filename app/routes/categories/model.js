const db = require('../../../data/dbConfig');

const getCategories = () => {
    return db.table('categories');
};

module.exports = {
    getCategories
};
