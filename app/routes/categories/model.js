const db = require('../../../data/dbConfig');

const CATEGORY_TABLE = 'categories';

const getCategories = () => {
    return db.table(CATEGORY_TABLE);
};

module.exports = {
    getCategories
};
