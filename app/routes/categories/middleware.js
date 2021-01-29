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
