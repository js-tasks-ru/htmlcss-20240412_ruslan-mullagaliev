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
  const data = JSON.parse(readFileSync('./data/preview/data.json', 'utf8'))[
    'tabs'
  ];
  const options = {
    batch: ['./views/partials'],
  };
  return gulp
    .src('./views/template/preview-tabs.hbs')
    .pipe(handlebars(data, options))
    .pipe(gulp.dest('./views/partials'));
});

gulp.task('index', function () {
  const data = JSON.parse(readFileSync('./data/preview/data.json', 'utf8'));
  const options = {
    batch: ['./views/partials'],
  };
  return gulp
    .src('./views/layout/index.hbs')
    .pipe(handlebars(data, options))
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

// Сборка компонентов
const innerPages = JSON.parse(
  readFileSync('./data/inner-page/data.json', 'utf8'),
);

innerPages.forEach((item) => {
  item.tabs.forEach((tab) => {
    tab['code'] = readFileSync(tab.codePath, 'utf8');
  });
});

innerPages.forEach((item) => {
  gulp.task(`pre-${item.url}`, function () {
    // console.log('item', item);
    const options = {
      batch: ['./views/partials'],
    };
    return gulp
      .src('./views/template/inner-page.hbs')
      .pipe(handlebars(item, options))
      .pipe(rename(`${item.url}.hbs`))
      .pipe(gulp.dest('./views/layout'));
  });

  gulp.task(item.url, function () {
    const options = {
      batch: ['./views/partials'],
    };
    return gulp
      .src(`./views/layout/${item.url}.hbs`)
      .pipe(handlebars(null, options))
      .pipe(rename(`${item.url}.html`))
      .pipe(gulp.dest('./pages'));
  });

  gulp.task(`format-${item.url}`, function (done) {
    const settings = JSON.parse(readFileSync('./.prettierrc', 'utf8'));
    settings['parser'] = 'html';
    const sourceHTML = readFileSync(`./dist/${item.url}.html`, 'utf8');
    const formattedHTML = prettier.format(sourceHTML, settings);
    writeFileSync(`./pages/${item.url}.html`, formattedHTML);
    done();
  });
});

gulp.task(
  'default',
  gulp.series('preview-histogram', 'preview-tabs', 'index', 'format-index'),
);

const innerPagesPreTasks = innerPages.map((item) => `pre-${item.url}`);
const innerPagesProcessTasks = innerPages.map((item) => item.url);
const innerPagesFormatTasks = innerPages.map((item) => `format-${item.url}`);

gulp.task(
  'inner-pages',
  gulp.series(...innerPagesPreTasks, ...innerPagesProcessTasks),
);
