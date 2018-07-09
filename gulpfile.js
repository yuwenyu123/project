var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');


gulp.task("sass", function() {
    //导入文件
    gulp.src("./src/sass/*.scss")

        //转代码
        .pipe(sass().on('error', sass.logError))
        //导出文件
        .pipe(gulp.dest("./src/css"))
})


gulp.task('server', function() {
    connect.server({
        root: './src/',//服务启动的根目录
        port: 88,//端口
        livereload: true//为true时gulp会自动检测文件的变化然后自动进行源码构建
    });
});


gulp.watch('./src/sass/*.scss', ['sass']);
gulp.task('default', ['server', 'sass']);