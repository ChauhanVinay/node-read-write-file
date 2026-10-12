const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-type', 'text/html');
        return res.end(`
            <html>
              <head><title>Task 1</title><head>
              <body>
                 <form action="/message"method="POST"> 
                 <label>Enter Message:</label>
                 <input type="text" name="message">
                 <button type="submit">Add</button>
                 </form>
              </body>
            </html>
            `);
    }

    if(url === '/message' && method === 'POST'){
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            //Write to file message
            fs.writeFile('message', message, (err) => {
                if(err) console.error(err);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

        res.statusCode = 404;
        res.setHeader('Content-type', 'text/html');
        res.end('<h1>Page Not Found</h1>');
});

server.listen(3000, () => {
    console.log('Server running onport 3000');
});