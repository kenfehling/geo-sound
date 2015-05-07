/*jshint strict: true */
/*global require */

var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var constants = require('./constants');

$(function() {
    "use strict";

    function onSectionPressed(msg, number) {

    }

    pubsub.subscribe(constants.EVENT.SECTION_PRESSED, onSectionPressed);
});