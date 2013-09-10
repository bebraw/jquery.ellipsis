var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect['static'](path.resolve(point));
};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: ['src/<%= pkg.name %>.js'],
            dest: 'dist/<%= pkg.name %>'
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= pkg.author %> - <%= pkg.license %>\n' +
                    '<%= pkg.homepage %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            basic: {
                src: ['<%= dirs.src %>'],
                dest: '<%= dirs.dest %>.js'
            }
        },
        uglify: {
            'default': {
                files: {
                    '<%= dirs.dest %>.min.js': ['<%= dirs.src %>']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '_site'
                }
            },
            livereload: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, '.')];
                    }
                }
            }
        },
        jekyll: {
            dev: {
                src: '.',
                dest: '_site',
                pygments: true,
                safe: true
            }
        },
        watch: {
            reload: {
                files: ['src/*.js', 'index.html'],
                tasks: 'refresh'
            }
        }
    });

    grunt.registerTask('refresh', ['concat:basic', 'uglify', 'jekyll:dev']);
    grunt.registerTask('default', ['refresh', 'connect:server', 'livereload-start', 'watch']);

    ['grunt-jekyll',
     'grunt-contrib-concat',
     'grunt-contrib-uglify',
     'grunt-contrib-watch',
     'grunt-contrib-connect',
     'grunt-contrib-livereload'].forEach(grunt.loadNpmTasks);
};
