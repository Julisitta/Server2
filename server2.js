const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    if (request.method == 'GET') {
        myReadStream.pipe(response);
    }
    else if (request.method == 'POST') {
        let whole = '';
        request.on('data', (chunk) => {
            whole += chunk.toString();
        })
        request.on('end', () => {
            let str = JSON.stringify(whole);
            fs.writeFile('test.txt', str, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            console.log(whole);
            response.end('Data received.');
            server.close();
        })
    }
    else {
        response.writeHead( 400, {'content-type' : 'text/plain'});
        response.end( 'Try something else.');
    }
});
server.listen(3000, () => console.log('Server working'));
