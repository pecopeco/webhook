'use strict';

const http = require('http');
const exec = require('child_process').exec;
const config = require('./config.json');
const server = http.createServer((req, res) => {
  serverResponse(req, res)
});
server.listen(config.port, config.hostname, () => {
});

function serverResponse (req, res) {
  const url = req.url
  let rules = {
    'err': function () {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 error!");
    }
  }
  config.project.forEach((rule) => {
    rules[rule.url] = () => {
      exec(rule.script, {cwd: rule.cwd}, (err, stdout) => {
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(rule.url + ' OK');
    }
  })
  return rules.hasOwnProperty(url) ? rules[url]() : rules['err']()
}
