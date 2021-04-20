import http from 'http';
import qs from 'querystring';
import { getAll, getItem } from './data.js';

http.createServer((req, res) => {

    let url = req.url.split("?"); // get route from query string
    let query = qs.parse(url[1]); // convert query string to object
    let path = url[0].toLowerCase();

    switch (path) {
        case "/":
            res.writeHead(200, {"Content-type": "text/plain"});
            res.end(JSON.stringify(getAll()));
            break;
        case "/about":
            res.writeHead(200, {"Content-type": "text/plain"});
            res.end("I am Hien Nguyen from Vietnam");
            break;
        case "/detail":
            res.writeHead(200, {"Content-type": "text/plain"});
            res.end(JSON.stringify(getItem(query.title)));
        default:
            res.writeHead(404, {"Content-type": "text/plain"});
            res.end("Not found");
            break;
    }
}).listen(process.env.PORT || 3000);