module.exports = () => {
    return (request, response, next) => {
        let time = new Date().toISOString();
        console.log(`[${time}]: ${request.ip} ${request.method} ${request.url}`);

        next();
    }
}
