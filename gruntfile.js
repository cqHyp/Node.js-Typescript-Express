module.exports = function(grunt) {
    "use strict";
  
    grunt.initConfig({
      copy: {
        build: {
          files: [
            {
              expand: true,
              cwd: './public',
              src: ["**"],
              dest: "./dist/public",
            },
            {
              expand: true,
              cwd: './views',
              src: ["**"],
              dest: "./dist/views",
            },
            {
              expand: true,
              cwd: './src/utils',
              src: ["**"],
              dest: "./dist/utils",
            },
          ]
        }
      },
      ts: {
        app: {
          files: [
            {
              src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
              dest: "./dist",
            }
          ],
          options: {
            module: "commonjs",
            target: "es6",
            sourceMap: false,
            rootDir: "src",
          }
        }
      },
      watch: {
        ts: {
          files: ["src/\*\*/\*.ts"],
          tasks: ["ts"],
        },
        views: {
          files: ["views/\*\*/\*.pug"],
          tasks: ["copy"],
        },
        js: {
          files: ["src/utils/\*\*/\*.js"],
          tasks: ["copy"],
        }
      }
    });
  
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
  
    grunt.registerTask("default", [
      "copy",
      "ts",
    ]);
  };