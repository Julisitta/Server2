const http = require('http');
const fs = require('fs');
const server = http.createServer(function(request, response) {
    let myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(response);
    if (request.method == 'POST') {
        let whole = '';
        request.on('data', (chunk) => {
            whole += chunk.toString();
            let str = JSON.stringify(whole);
            fs.writeFileSync('test.txt', str);
        })
        request.on('end', () => {
            console.log(whole)
            response.end('Data received.')
        })
    }
});
server.listen(3000, () => console.log('Server working'));
