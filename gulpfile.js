const gulp             = require("gulp");
const minimist         = require('minimist');
const parallelize      = require('concurrent-transform');
const path             = require('path');
const awspublish       = require('gulp-awspublish');
const cloudfront       = require('gulp-cloudfront');
const rename           = require('gulp-rename');

const knownOptions = {
  string: 'region',
  string: 'bucket',
  string: 'cloudfront',
  default: { bucket: null, cloudfront: null, region: null }
};
const options = minimist(process.argv.slice(2), knownOptions);

function _getAWSPublisher() {
  if(!options.region) throw new Error('A target region is required to publish.');
  if(!options.bucket) throw new Error('A target bucket is required to publish.');

  var aws = {
    region: options.region,
    params: {
      Bucket: options.bucket
    }
  };
  return awspublish.create(aws);
}

gulp.task('default', ['publish']);
gulp.task('publish', ['publish:assets', 'publish:index']);

gulp.task('rename:index', function() {
  return gulp.src(['dist/index.*.html'])
    .pipe(rename(function (path) {
      path.basename = 'index';
    }))
    .pipe(gulp.dest("./dist"));
});
gulp.task('publish:index', ['rename:index'], function() {
  var publisher = _getAWSPublisher();
  var headers = { 'Cache-Control': 'max-age=1, no-transform, public' };
  return gulp.src(['dist/index.html'])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers), 10)
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
});

gulp.task('publish:assets', function() {
  var publisher = _getAWSPublisher();
  var headers = { 'Cache-Control': 'max-age=3600, no-transform, public' };
  var cloudfrontConfig = {
    bucket            : options.bucket,
    region            : options.region,
    distributionId    : options.cloudfront,
    patternIndex      : new RegExp('index.' + process.env.BUILD_VERSION + '.html', 'gi')
  };

  return gulp.src(['dist/**'])
    .pipe(awspublish.gzip())
    .pipe(parallelize(publisher.publish(headers), 10))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(cloudfrontConfig));
});
