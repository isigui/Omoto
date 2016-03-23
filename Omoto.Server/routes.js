module.exports = (function () {
    'use strict';
    var router = require('express').Router();
    
    
    router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
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