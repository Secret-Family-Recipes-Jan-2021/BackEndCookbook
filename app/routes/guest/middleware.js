const validateGuestToken = () => {
    return (request, response, next) => {
        try {
            // TODO: validate guest token

            next()
        } catch (error) {
            next(error);
        }
    };
};

module.exports = { validateGuestToken };
