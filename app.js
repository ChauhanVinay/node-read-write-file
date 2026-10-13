const http = require('http');
const routes = require("./routes");

// If using Way 1:
const server = http.createServer(routes);

// If using Way 2 or Way 3:
// const server = http.createServer(routes.handler);

server.listen(3000, () => {
    console.log('Server running on port 3000');
});