const validateCategory = () => {
    return (request, response, next) => {
        try {
            // TODO: validate incoming data
            next();
        } catch (error) {
            next(error);
        }
    };
};

const validateCategoryID = () => {
    return (request, response, next) => {
        try {
            // TODO: verify the id is valid
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    validateCategory,
    validateCategoryID
};
