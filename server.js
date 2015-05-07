/**
 * Express server
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, process, __dirname, console */

var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
var root = path.join(__dirname, 'public');
app.use(favicon(path.join(root, 'favicon.ico')));
app.use(express.static(root));

console.log(root);

var router = express.Router();
router.route('/').get(function(req, res) {
    "use strict";
    res.sendFile('/index.html', { root: root });
});

var port = process.env.PORT || 5000;
console.log("Serving on port " + port);
app.listen(port);