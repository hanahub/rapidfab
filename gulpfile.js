const gulp             = require("gulp");
const minimist         = require('minimist');
const parallelize      = require('concurrent-transform');
const path             = require('path');
const awspublish       = require('gulp-awspublish');
const cloudfront       = require('gulp-cloudfront');

const knownOptions = {
  string: 'region',
  string: 'bucket',
  string: 'cloudfront',
  default: { bucket: null, cloudfront: null, region: null }
};
const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('default', ['publish']);
gulp.task('publish', function() {
  if(!options.region) throw new Error('A target region is required to publish.');
  if(!options.bucket) throw new Error('A target bucket is required to publish.');

  var aws = {
    region: options.region,
    params: {
      Bucket: options.bucket
    }
  };
  var publisher = awspublish.create(aws);
  var headers = { 'Cache-Control': 'max-age=3600, no-transform, public' };
  var cloudfrontConfig = {
    bucket            : aws.bucket,
    region            : aws.region,
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
