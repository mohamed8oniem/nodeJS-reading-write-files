const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempproduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);
const tempnoutfound = fs.readFileSync(
    `${__dirname}/templates/404.html`,
    'utf-8'
);
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // OverView Page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const cardsHTML = dataObj
            .map((el) => {
                return replaceTemplate(tempCard, el);
            })
            .join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        res.end(output);
        // Product Page
    } else if(pathname === '/product') {
        const product = dataObj[query.id];
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const validProduct=  product ? true : false;
        if(validProduct){
           const output=replaceTemplate(tempproduct, product);
            res.end(output)
        }else{
            res.end(tempnoutfound)
        }
      
    }
    // API
    else if(pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(data);
    }
    // Not Found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page Not Found</h1>');
    }
});
server.listen(3000, '127.0.0.1', () => {
    console.log('listening to requests in port 3000');
});