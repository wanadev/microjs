module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        browserify: {
            complete: {
                files: {
                    "Build/ujs.complete.min.js": ["./index.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "ujs"
                    }
                }
            },
            ujs: {
                files: {
                    "Build/ujs.min.js": ["./ujs.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "ujs"
                    }
                }
            },
            ujsArraylist: {
                files: {
                    "Build/ujs.ArrayList.min.js": ["./ujs.ArrayList.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "ujs.ArrayList"
                    }
                }
            },
            ujsDictionary: {
                files: {
                    "Build/ujs.Dictionary.min.js": ["./ujs.Dictionary.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "ujs.Dictionary"
                    }
                }
            },
            ujsMath: {
                files: {
                    "Build/ujs.Math.min.js": ["./ujs.Math.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "ujs.Math"
                    }
                }
            }
        },

        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: "Build/",
                    src: "*.js",
                    dest: "Build/"
                }]
            }
        },

        yuidoc: {
            compile: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "<%= pkg.homepage %>",
                options: {
                    paths: "./",
                    "linkNatives": "true",
                    "attributesEmit": "true",
                    "selleck": "true",
                    "outdir": "Build/Docs"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    grunt.registerTask("default", ["browserify", "uglify", "yuidoc"]);

};
