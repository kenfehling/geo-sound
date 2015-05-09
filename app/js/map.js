var HIGHLIGHT_DURATION = 1000;  // milliseconds
var ORIGINAL_WIDTH = 800;
var ORIGINAL_HEIGHT = 600;
var SCALED_WIDTH = 480;
var SCALED_HEIGHT = 360;
var DEFAULT_OPACITY = 0.5;
var SVG_FILE = '/img/map.svg';
var ID = 'map';

/*jshint strict: true */
/*global require */

var $ = require('jquery');
var _ = require('lodash');
var Snap = require('snapsvg');
var pubsub = require('pubsub-js');
var constants = require('./constants');

$(function() {
    "use strict";

    loadSvg(function() {  // When finished loading SVG
        unhighlightAll();
        _.each(_.range(constants.NUM_TYPES), function(i) {
            var $section = getColorIndexPath(i);
            $section.click(function() {
                sectionPressed($section, i);
            });
        });
    });

    function loadSvg(callback) {
        var snap = new Snap("#" + ID);
        Snap.load(SVG_FILE, function(data){
            snap.append(data);
            var svg = $("#" + ID).find('svg')[0];
            svg.setAttribute('width', SCALED_WIDTH + 'px');
            svg.setAttribute('height', SCALED_HEIGHT + 'px');
            svg.setAttribute('viewBox', '0 0 ' + ORIGINAL_WIDTH + ' ' + ORIGINAL_HEIGHT);
            svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
            callback();
        });
    }

    function sectionPressed($section, colorNumber) {
        highlight($section);
        setTimeout(function() {
            unhighlight($section);
        }, HIGHLIGHT_DURATION);
        pubsub.publish(constants.EVENT.SECTION_PRESSED, colorNumber);
    }

    function unhighlight($section) {
        $section.attr('fill-opacity', DEFAULT_OPACITY);
    }

    function unhighlightAll() {
        _.each(_.range(constants.NUM_TYPES), unhighlightIndex);
    }

    function highlight($section) {
        $section.attr('fill-opacity', '1.0');
    }

    function unhighlightIndex(index) {
        var $path = getColorIndexPath(index);
        unhighlight($path);
    }

    function getColorIndexPath(index) {
        return $('#Map_Layer_' + (index + 1));
    }
});