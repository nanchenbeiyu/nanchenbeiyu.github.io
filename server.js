/* 零依赖静态服务器：仅用于本地预览，支持 --port / --host 参数转发 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
function argOf(name, fallback) {
    const i = args.findIndex(a => a === name || a.startsWith(name + "="));
    if (i === -1) return fallback;
    const eq = args[i].indexOf("=");
    if (eq !== -1) return args[i].slice(eq + 1);
    return args[i + 1] || fallback;
}
const port = parseInt(argOf("--port", process.env.PORT || "7100"), 10);
const host = argOf("--host", "0.0.0.0");

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".json": "application/json; charset=utf-8"
};

const root = __dirname;

http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const file = path.normalize(path.join(root, urlPath));
    if (!file.startsWith(root)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }
    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }
        res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(data);
    });
}).listen(port, host, () => {
    console.log(`fairytale site → http://${host}:${port}/`);
});
