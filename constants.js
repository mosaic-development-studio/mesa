const CLIENT_DIRECTORY = 'client';

const DESTINATION = {
    CSS: 'main.css',
    DIRECTORY: 'dist/',
    JAVASCRIPT: 'main.js',
    SOURCE_MAPS: '.',
    VENDOR_CSS: 'vendor.css'
};

const SOURCE = {
    CSS: CLIENT_DIRECTORY + '/**/*.css',
    HTML: CLIENT_DIRECTORY + '/*.html',
    JAVASCRIPT: CLIENT_DIRECTORY + '/js/index.js',
    SASS: CLIENT_DIRECTORY + '/sass/base.scss',
    STATIC: [
        CLIENT_DIRECTORY + '/**/*.ico',
        CLIENT_DIRECTORY + '/**/*.jpg',
        CLIENT_DIRECTORY + '/**/*.png',
        CLIENT_DIRECTORY + '/**/*.svg'
    ],
    TEMPLATES: CLIENT_DIRECTORY + '/templates/*.html'
};

const TARGET_BROWSERS = {
    browsers: [
        'last 2 major versions',
        'ie 11'
    ]
};

const TASKS = {
    BUILD: 'build',
    CSS: 'css',
    DEFAULT: 'default',
    HTML: 'html',
    JAVASCRIPT: 'js',
    SASS: 'sass',
    STATIC: 'static',
    WATCH: 'watch'
};

const WATCH_FILES = {
    HTML: CLIENT_DIRECTORY + '/**/*.html',
    JAVASCRIPT: CLIENT_DIRECTORY + '/**/*.js',
    SASS: CLIENT_DIRECTORY + '/**/*.scss'
};

module.exports = {
    DESTINATION,
    SOURCE,
    TARGET_BROWSERS,
    TASKS,
    WATCH_FILES
};