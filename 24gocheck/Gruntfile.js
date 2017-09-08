module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        ngdocs: {
            options: {
                dest: 'docs',
                startPage: '/api/starter',
                title: "i2CSMobile ionic app",
                html5Mode: false,
                bestMatch: true,
                sourceLink: true,
                editLink: true
            },
            api: {
                src: ['www/app/**/*.js'],
                title: 'API Documentation'
            }
        },
        connect: {
            options: {
                keepalive: true
            },
            server: {}
        },
        clean: ['docs']
    });

    grunt.registerTask('default', ['clean', 'ngdocs', 'connect']);
};