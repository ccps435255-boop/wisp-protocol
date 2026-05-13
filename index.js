import { WispServer } from '@mercuryworkshop/wisp-js/server';
import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Wisp Proxy Online');
});

const wisp = new WispServer();
const PORT = process.env.PORT || 8080;

server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`Wisp routing live on port ${PORT}`);
});
