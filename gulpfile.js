var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback){
    var swPrecache = require('sw-precache');

    swPrecache.write('./sw-assets.js', {
      staticFileGlobs: [
        'app/**/*.*',
        'app/*.*',
        'bower_components/*/*.min.js',
        'bower_components/*/*.min.css',
        'bower_components/material-design-icons/iconfont/*.*',
        '*.html',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      ]
    }, callback);
});
