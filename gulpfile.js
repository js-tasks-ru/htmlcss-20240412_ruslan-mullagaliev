const { readFileSync, writeFileSync } = require('fs');
const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const prettier = require('prettier');

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

gulp.task('format-index', function (done) {
  const settings = JSON.parse(readFileSync('./.prettierrc', 'utf8'));
  settings['parser'] = 'html';
  const sourceHTML = readFileSync('./dist/index.html', 'utf8');
  const formattedHTML = prettier.format(sourceHTML, settings);
  writeFileSync('./index.html', formattedHTML);
  done();
});

gulp.task(
  'default',
  gulp.series('preview-histogram', 'preview-tabs', 'index', 'format-index'),
);
