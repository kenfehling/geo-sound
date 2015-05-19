var HIGHLIGHT_DURATION = 1000;  // milliseconds
var DEFAULT_OPACITY = 0.5;
var SVG_FILE = '/img/map.svg';
var ID = 'map';

var $ = require('jquery');
var _ = require('lodash');
var Snap = require('snapsvg');
var pubsub = require('pubsub-js');
var constants = require('./constants');

var svg, origWidth, origHeight, widthToHeight;

$(function() {
    "use strict";
    $(window).resize(resize);

    loadSvg(function() {  // When finished loading SVG
        unhighlightAll();
        _.each(_.range(constants.NUM_TYPES), function(i) {
            var $section = getColorIndexPath(i);
            $section.click(function() {
                sectionPressed($section, i);
            });
        });
    });

    function resize() {
        var maxWidth = $(window).width();
        var maxHeight = $(window).height();
        var widthIsBigger = maxWidth/maxHeight > widthToHeight;
        if (widthIsBigger) {
            setSvgSize(maxHeight * widthToHeight, maxHeight);
        }
        else {
            setSvgSize(maxWidth, maxWidth / widthToHeight);
        }
    }

    function setSvgSize(w, h) {
        if (svg) {
            svg.setAttribute('width', Math.floor(w) + 'px');
            svg.setAttribute('height', Math.floor(h) + 'px');
        }
    }

    function loadSvg(callback) {
        var snap = new Snap("#" + ID);
        Snap.load(SVG_FILE, function(data){
            snap.append(data);
            svg = $("#" + ID).find('svg')[0];
            var $svg = $(svg);
            origWidth = $svg.width();
            origHeight = $svg.height();
            widthToHeight = origWidth / origHeight;
            svg.setAttribute('viewBox', '0 0 ' + origWidth + ' ' + origHeight);
            svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
            resize();
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