/*jshint node: true*/
/*global module, require*/
module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        meta: {

            // Package information.
            pkg: grunt.file.readJSON('package.json'),

            // Directories.
            demo: {
                css: 'demo/css',
                js: 'demo/js',
                root: 'demo'
            },

            release: {
                css: 'dist/css',
                js: 'dist/js',
                root: 'dist'
            },

            temp: {
                css: 'temp/css',
                js: 'temp/js',
                root: 'temp'
            },

            source: {
                html: 'src/html',
                js: 'src/js',
                less: 'src/less'
            },

            // Put some credentials on top of generated output files.
            // Usage: '<%= meta.banner.join("\\n") %>\n'.
            banner: [
                '/*!',
                ' * Project: <%= meta.pkg.name %>',
                ' * Homepage: <%= meta.pkg.homepage %>',
                ' * Version: <%= meta.pkg.version %>',
                ' * Author: <%= meta.pkg.author.name %> (<%= meta.pkg.author.email %>, <%= meta.pkg.author.url %>)',
                ' * Date: <%= grunt.template.today("mmmm dS, yyyy") %>',
                ' * Copyright (C) <%= grunt.template.today("yyyy") %>',
                ' */'
            ]

        },

        clean: {
            demo: '<%= meta.demo.root %>',
            release: '<%= meta.release.root %>',
            temp: '<%= meta.temp.root %>'
        },

        // Add credential banners to the output files.
        concat: {
            js: {
                src: ['<%= meta.source.js %>/jquery-input-char-count.js'],
                dest: '<%= meta.temp.js %>/jquery-input-char-count.js',
                options: {
                    banner: '<%= meta.banner.join("\\n") %>\n'
                }
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            release: {
                files: {
                    '<%= meta.release.css %>/jquery-input-char-count-bootstrap3.min.css': ['<%= meta.temp.css %>/jquery-input-char-count-bootstrap3.css']
                }
            }
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
                    {src: '<%= meta.temp.js %>/jquery-input-char-count.js', dest: '<%= meta.release.js %>/jquery-input-char-count.js'},
                    {src: '<%= meta.temp.css %>/jquery-input-char-count-bootstrap3.css', dest: '<%= meta.release.css %>/jquery-input-char-count-bootstrap3.css'}
                ]
            }
        },

        less: {
            release: {
                options: {
                    banner: '<%= meta.banner.join("\\n") %>\n',
                    cleancss: true,
                    compress: false
                },
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                ],
                files: {
                    '<%= meta.temp.css %>/jquery-input-char-count-bootstrap3.css': '<%= meta.source.less %>/jquery-input-char-count-bootstrap3.less'
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner.join("\\n") %>',
                compress: true,
                mangle: true,
                output: {
                    comments: false
                },
                sourceMap: true
            },
            release: {
                files: {
                    '<%= meta.release.js %>/jquery-input-char-count.min.js': '<%= meta.temp.js %>/jquery-input-char-count.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('release', ['clean:release', 'less:release', 'concat:js', 'cssmin:release', 'copy:release', 'uglify:release', 'clean:temp']);
    grunt.registerTask('demo', ['release', 'clean:demo', 'copy:demo']);

};