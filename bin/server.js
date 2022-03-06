const app = require('../src/app');
const http = require('http'); // criar o servidor http
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.port || '3000');
app.set('port', port);

//Criando o servidor
const server = http.createServer(app);

// Servidor ouvindo a porta
server.listen(port);
server.on('error', onError); // Se for gerado o evento de erro, chama a função de tratamento de erro
server.on('listening', onListening); // Quando gerado o evento de listening, chama a função do Debug
console.log('Api rodando na porta ' + port);

// Criando a função para normalizar a porta 
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// Criando a função para tratamento de erro
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port == 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}

function onListening() {
    const addr = server.address();
    const bind = typeof addr == 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    debug('Listening on ' + bind);
}