#!/bin/sh
APP="geo-sound"

heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git --app $APP;
heroku config:set NODE_ENV=production --app $APP;