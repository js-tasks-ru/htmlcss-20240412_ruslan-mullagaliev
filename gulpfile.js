import { readFileSync } from 'fs';
import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import rename from 'gulp-rename';
import prettier from 'gulp-prettier';

gulp.task('preview-histogram', function () {
  const data = JSON.parse(readFileSync('./data/histogram/data.json', 'utf8'));
  const options = {
    batch: ['./views/partials'],
  };
  return gulp
    .src('./views/template/preview-histogram.hbs')
    .pipe(handlebars(data, options))
    .pipe(gulp.dest('./views/partials'));
});

gulp.task('preview-tabs', function () {
  const data = JSON.parse(
    readFileSync('./data/preview-tabs/data.json', 'utf8'),
  );
  const options = {
    batch: ['./views/partials'],
    helpers: {
      partialStr: function (str) {
        return new handlebars.Handlebars.SafeString('{{> ' + str + '}}');
      },
    },
  };
  return gulp
    .src('./views/template/preview-tabs.hbs')
    .pipe(handlebars(data, options))
    .pipe(gulp.dest('./views/partials'));
});

gulp.task('index', function () {
  const options = {
    batch: ['./views/partials'],
  };
  return gulp
    .src('./views/layout/index.hbs')
    .pipe(handlebars(null, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('format-index', function () {
  const settings = JSON.parse(readFileSync('./.prettierrc', 'utf8'));
  return gulp
    .src('./dist/index.html')
    .pipe(prettier(settings))
    .pipe(gulp.dest('./'));
});

gulp.task(
  'default',
  gulp.series('preview-histogram', 'preview-tabs', 'index', 'format-index'),
);
