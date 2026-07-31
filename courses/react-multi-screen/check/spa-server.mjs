// 없는 주소로 온 요청도 index.html로 돌려주는 파일 서버입니다.
// 주소를 화면이 정하는 앱은 새로 고침 요청이 서버에 그대로 가므로 이 되돌림이 없으면 404가 됩니다.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('../dist/', import.meta.url).pathname;
const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
};

const send = async (response, path, status) => {
    const body = await readFile(path);
    response.writeHead(status, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' });
    response.end(body);
};

createServer(async (request, response) => {
    const path = join(ROOT, normalize(decodeURI(request.url.split('?')[0])));
    try {
        await send(response, path.endsWith('/') ? join(path, 'index.html') : path, 200);
    } catch {
        // 파일이 없으면 첫 파일을 돌려줍니다. 화면이 주소를 보고 알맞은 자리를 그립니다.
        await send(response, join(ROOT, 'index.html'), 200);
    }
}).listen(4181, () => console.log('되돌림 설정을 둔 파일 서버: http://localhost:4181'));
