var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var nested = require('postcss-nested');
var cssnext = require('cssnext');
var browserSync = require('browser-sync').create();
var importCSS = require('postcss-import');

gulp.task('default',  function() {
	gulp.run('dev');
});

gulp.task('dev', ['build', 'watch', 'browser-sync']);

gulp.task('build', ['styles']);

gulp.task('styles', function() {
    var processors =[
        autoprefixer({browsers: ['last 2 version']}),
        cssnano(),
        nested(),
        importCSS()
    ];

    return gulp.src('./src/postcss/style.css') 
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: './src'
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('src/postcss/**/*.css', ['styles']); //стили
    //gulp.watch('src/js/*.js', ['scripts']); //скрипты
    //gulp.watch('src/*.html', ['html']); // html
    //gulp.watch('src/assets/**/*.*', ['assets']); //наши локальные файлы(картинки, шрифты)
    gulp.watch('src/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
});


