const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {        
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Usernames</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {        
        res.write('<html>');
        res.write('<head><title>This is the users page</title></head>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li><li>User5</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {      
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);            
        })
        
        res.statusCode = 302;
        res.setHeader('Location', '/');           
        return res.end();       
       
    }    
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Default page</title></head>');
    res.write('<body><h1>This is the default page !</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);