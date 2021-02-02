const jwt = require('jsonwebtoken');

const validateGuestToken = () => {
    return (request, response, next) => {
        try {
            let token = request.query.token ? request.query.token : false;

            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                    if(error) {
                        return response.status(400).json({message: 'token invalid'});
                    } else {
                        request.guestToken = decoded;

                        next();
                    }
                });
            } else {
                return response.status(400).json({message: 'token required'});
            }
        } catch (error) {
            next(error);
        }
    };
};

module.exports = { validateGuestToken };
