/*global module, require*/
module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        meta: {

            demo: {
                css: 'demo/css',
                js: 'demo/js',
                root: 'demo'
            },

            release: {
                css: 'dist/css',
                js: 'dist/js'
            },

            source: {
                html: 'src/html',
                js: 'src/js',
                less: 'src/less'
            }
        },

        clean: {
            demo: 'demo',
            release: 'dist'
        },

        copy: {
            demo: {
                files: [
                    {src: 'node_modules/bootstrap/dist/css/bootstrap.min.css', dest: '<%= meta.demo.css %>/bootstrap.min.css'},
                    {src: 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css', dest: '<%= meta.demo.css %>/bootstrap-theme.min.css'},
                    {src: 'node_modules/jquery/dist/jquery.min.js', dest: '<%= meta.demo.js %>/jquery.min.js'},
                    {src: '<%= meta.release.css %>/jquery-input-char-count-bootstrap3.min.css', dest: '<%= meta.demo.css %>/jquery-input-char-count-bootstrap3.min.css'},
                    {src: '<%= meta.release.js %>/jquery-input-char-count.js', dest: '<%= meta.demo.js %>/jquery-input-char-count.js'},
                    {src: '<%= meta.source.html %>/index.html', dest: '<%= meta.demo.root %>/index.html'}
                ]
            },
            release: {
                files: [
                    {src: '<%= meta.source.js %>/jquery-input-char-count.js', dest: '<%= meta.release.js %>/jquery-input-char-count.js'}
                ]
            }
        },

        less: {
            release: {
                options: {
                    cleancss: true,
                    compress: false
                },
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                ],
                files: {
                    '<%= meta.release.css %>/jquery-input-char-count-bootstrap3.css': '<%= meta.source.less %>/jquery-input-char-count-bootstrap3.less'
                }
            },
            releaseMin: {
                options: {
                    cleancss: true,
                    compress: true
                },
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                ],
                files: {
                    '<%= meta.release.css %>/jquery-input-char-count-bootstrap3.min.css': '<%= meta.source.less %>/jquery-input-char-count-bootstrap3.less'
                }
            },
        },

        uglify: {
            options: {
                mangle: false
            },
            release: {
                files: {
                    '<%= meta.release.js %>/jquery-input-char-count.min.js': '<%= meta.source.js %>/jquery-input-char-count.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('release', ['clean:release', 'less:release', 'less:releaseMin', 'copy:release', 'uglify:release']);
    grunt.registerTask('demo', ['release', 'clean:demo', 'copy:demo']);

};