const server = require('./app/server');
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`server running on ${port}`);
});