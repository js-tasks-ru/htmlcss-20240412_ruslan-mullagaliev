const { readFileSync, writeFileSync } = require('fs');
const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const prettier = require('prettier');

// layout types for components
const pageTypes = ['preview', 'inner-page'];

const innerPages = JSON.parse(
  readFileSync('./data/inner-page/data.json', 'utf8'),
);

const previewTabs = JSON.parse(
  readFileSync('./data/preview/data.json', 'utf8'),
);

const components = innerPages.map((item) => item.url);

pageTypes.forEach((pageType) => {
  components.forEach((component) => {
    // костыль для selected радио-кнопок на превью
    const suffixes =
      component === 'custom-form-elements' && pageType === 'preview'
        ? ['-1', '-2', '-3']
        : [''];
    suffixes.forEach((suffix) => {
      gulp.task(`${pageType}-${component}${suffix}`, function () {
        let data = {};
        if (['histogram', 'calendar'].includes(component)) {
          data = JSON.parse(
            readFileSync(`./data/${component}/data.json`, 'utf8'),
          );
        }
        data[pageType] = pageType;
        data['suffix'] = suffix;
        const options = {};
        return gulp
          .src(`./views/template/${component}.hbs`)
          .pipe(handlebars(data, options))
          .pipe(rename(`${pageType}-${component}${suffix}.hbs`))
          .pipe(gulp.dest('./views/partials'));
      });
    });
  });
});

gulp.task('preview-tabs', function () {
  const data = previewTabs['tabs'];
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

innerPages.forEach((item) => {
  item.tabs.forEach((tab) => {
    if (Array.isArray(tab.codePath)) {
      const code = tab.codePath.map((item) => {
        return readFileSync(item, 'utf8');
      });
      tab['code'] = code.join(' ');
    } else {
      tab['code'] = readFileSync(tab.codePath, 'utf8');
    }
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

const previewComponentsTasks = [];
components.forEach((component) => {
  // костыль для радио-кнопок на превью
  const suffixes =
    component === 'custom-form-elements' ? ['-1', '-2', '-3'] : [''];
  suffixes.forEach((suffix) => {
    previewComponentsTasks.push(`preview-${component}${suffix}`);
  });
});

gulp.task(
  'default',
  gulp.series(
    ...previewComponentsTasks,
    'preview-tabs',
    'index',
    'format-index',
  ),
);

const innerPagesComponentsTasks = components.map(
  (item) => `inner-page-${item}`,
);
const innerPagesPreTasks = innerPages.map((item) => `pre-${item.url}`);
const innerPagesProcessTasks = innerPages.map((item) => item.url);
// const innerPagesFormatTasks = innerPages.map((item) => `format-${item.url}`);

gulp.task(
  'inner-pages',
  gulp.series(
    ...innerPagesComponentsTasks,
    ...innerPagesPreTasks,
    ...innerPagesProcessTasks,
  ),
);
