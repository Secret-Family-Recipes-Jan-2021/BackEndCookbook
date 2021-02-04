const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        // let token = request.cookies.token ? request.cookies.token : false;
        let token = request.authorization.token ? request.authorization.token : false;
         console.log(request.authorization);

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    return response.status(400).json({message: 'token invalid'});
                } else {
                    request.token = decoded;

                    next();
                }
            });
        } else {
            return response.status(400).json({message: 'token required'});
        }

    } catch (error) {
        next(error)
    }
};
