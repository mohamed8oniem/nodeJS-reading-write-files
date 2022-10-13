const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('this is overview page !');
    } else if(pathName === '/products') {
        res.end('this is products page !');
    } 
    else {
        res.writeHead(404,{
            'Content-type':'text/html'
        })
        res.end('<h1>Page Not Found</h1>');
    }
});
server.listen(3000, '127.0.0.1', () => {
    console.log('listening to requests in port 3000');
});