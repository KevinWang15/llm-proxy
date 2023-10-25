import express from "express";
import {HttpsProxyAgent} from 'https-proxy-agent';
import bodyParser from 'body-parser';
import axios from 'axios';

import config from "./config.js"

const proxyAgent = new HttpsProxyAgent(config.proxy);
const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});


app.use(function (req, res, next) {
    if (req.headers["authorization"] !== "Bearer " + config.requiredBearerToken) {
        res.status(401);
        res.end("");
        return;
    }

    next();
})

for (let route of config.routes) {
    app.post(route.path, bodyParser.json(), (req, res, next) => {
        const reqBody = route.processRequestBody(req.body);
        axios.post(`${route.upstreamSite}`, reqBody, {
            headers: {
                "content-type": "application/json",
                ...route.extraHeadersForUpstream,
            },
            httpsAgent: route.requiresProxy ? proxyAgent : undefined,
        }).then(r => {
            res.send(
                route.processResponseBody(r.data)
            )
            res.end();
        })
    })
}

app.listen(30303, () => {
    console.log("Listening on port 30303");
});

