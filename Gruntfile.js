/*jshint strict: true */
/*global module */

module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['app/js/*', 'app/css/*' ],
            tasks: ['browserify', 'sass']
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            dist: {
                files: {
                    'public/build/bundle.js': ['app/js/*.js']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/build/style.css': 'app/css/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('heroku:production', ['browserify', 'sass']);
};