import Gulp from 'gulp';
import Sass from 'sass';
import GulpSass from 'gulp-sass';
import PostHtml from 'gulp-posthtml';
import PHInclude from 'posthtml-include';
import Del from 'del';
import Path from 'path';

export const clean = () => Del([ OUTPUT_DIR ]);

const OUTPUT_DIR = 'dist/';

function sassImporter(url, pre) {
  let extensions = ['.sass', '.scss'];
  let pathExt = Path.extname(url);
  if (extensions.includes(pathExt)) {
    extensions = [pathExt];
    url = url.slice(0, -pathExt.length);
  }

  let try_url = (url) => {
    let underscored = Path.dirname(url) + '/_' + Path.basename(url);
    for (let base of [url, underscored]) {
      for (let ext of extensions) {
        try {
          return require.resolve(base + ext);
        } catch (err) {
          if (err.code == 'MODULE_NOT_FOUND') {
            // don't care, continue;
          } else {
            throw err;
          }
        }
      }
    }
    return null;
  }

  let result = try_url(url);
  if (result == null) {
    result = try_url(url + '/index');
  }
  if (result == null) {
    return null;
  } else {
    return {file: result};
  }
}

export function styles() {
  return Gulp.src('src/*.scss')
    .pipe(GulpSass(Sass)({importer: sassImporter}))
    .pipe(Gulp.dest(OUTPUT_DIR));
}

export function html() {
  const plugins = [ PHInclude({ root: 'src/' }) ];

  return Gulp.src(['src/**/*.html', '!**/_*.html'])
    .pipe(PostHtml(plugins))
    .pipe(Gulp.dest(OUTPUT_DIR));
}

export function js() {
  return Gulp.src('src/**/*.js')
    .pipe(Gulp.dest(OUTPUT_DIR));
}

// Included JS from dependencies
export function modules() {
  const bootstrap = require.resolve('bootstrap');
  return Gulp.src(bootstrap)
    .pipe(Gulp.dest(OUTPUT_DIR));
}

export function staticfiles() {
  return Gulp.src('static/**/*')
    .pipe(Gulp.dest(Path.join(OUTPUT_DIR, 'static')));
}

export function watch() {
  Gulp.watch('src/**/*.js', js);
  Gulp.watch('src/**/*.scss', styles);
  Gulp.watch('src/**/*.html', html);
  Gulp.watch('static/**/*', staticfiles);
}

const build = Gulp.series(clean, Gulp.parallel(styles, html, js, staticfiles, modules));

export default build;
