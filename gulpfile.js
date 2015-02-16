var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var docgen = require('baasic-javascript-docgen');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleDefinition.js", "*.js"]))
	.pipe(plugins.concat('baasic-angular-article.js'))
	.pipe(plugins.header('(function (angular, undefined) {\n'))
	.pipe(plugins.footer('\n})(angular);'))
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify())
	.pipe(plugins.rename('baasic-angular-article.min.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('docs', function() {
  docgen.generateBaasicDocs("src", "wiki", "Baasic Articles Navigation", ["config.js"]);
});

gulp.task('default', ['scripts', 'docs']);
