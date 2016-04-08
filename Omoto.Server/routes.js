module.exports = (function () {
    var http = require('http');
    'use strict';
    var router = require('express').Router();
    
    
    router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader()
        res.end('Accueil');
    });
    
    router.get('/test', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        
        res.end('test ok');
    });
    
    router.get('/video', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');

            res.end('video');
    });
    
    return router;
})();