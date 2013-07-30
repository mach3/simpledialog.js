
module.exports = function(grunt){

	var banner = grunt.template.process(
		grunt.file.read("./src/banner.js"), 
		{ data: grunt.file.readJSON("package.json") }
	);

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.initConfig({
		concat: {
			dist: {
				options: {
					banner: banner
				},
				files: {
					"dist/simpledialog.js": [
						"src/simpledialog.js",
						"src/simpledialog.effects.js"
					]
				}
			}
		},
		uglify: {
			dist: {
				options: {
					banner: banner
				},
				files: {
					"dist/simpledialog.min.js": [
						"src/simpledialog.js",
						"src/simpledialog.effects.js"
					]
				}
			}
		}
	});

	grunt.registerTask("default", ["concat:dist", "uglify:dist"]);

};