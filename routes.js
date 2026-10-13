
const fs = require('fs');

const requestHandler = (req, res) => {
     const url = req.url;
        const method = req.method;
    
        if (url === '/') {
            // Read stored messages from the file named 'message'
            fs.readFile('message', 'utf8', (err, data) => {
                const existingMessages = err || !data ? 'No messages yet' : decodeURIComponent(data.replace(/\+/g, ' '));
    
                res.setHeader('Content-Type', 'text/html');
                return res.end(`
                    <html>
                        <head><title>Task 2</title></head>
                        <body>
                            <p><strong>${existingMessages}</strong></p>
                            <form action="/message" method="POST">
                                <input type="text" name="message">
                                <button type="submit">Send</button>
                            </form>
                        </body>
                    </html>
                `);
            });
            return;
        }
    
        if (url === '/message' && method === 'POST') {
            const body = [];
    
            req.on('data', (chunk) => {
                body.push(chunk);
            });
    
            return req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
    
                // Writes to file named 'message'
                fs.writeFile('message', message, (err) => {
                    if (err) console.error(err);
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                });
            });
        }
     
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Page Not Found</h1>');
}

// --- Way 1: Exporting a single function ---
module.exports = requestHandler;

// --- Way 2: Exporting an object with properties ---
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// --- Way 3: Using exports shortcut directly ---
// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';