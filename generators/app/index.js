/**
 * @file generator-edp-es6
 * @author leon(ludafa@outlook.com)
 */

const generators = require('yeoman-generator');
const _ = require('lodash');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

module.exports = generators.Base.extend({

    prompting() {

        const done = this.async();

        this.prompt(
            [
                {
                    'type': 'input',
                    'name': 'name',
                    'message': 'Your project name',
                    'store': false,
                    'default': _.kebabCase(this.appname)
                },
                {
                    'type': 'input',
                    'name': 'description',
                    'message': 'Your project description',
                    'store': false,
                    'default': 'a edp project with es6 support'
                },
                {
                    'type': 'input',
                    'name': 'main',
                    'message': 'Your project main file',
                    'store': false,
                    'default': 'src/main.js'
                },
                {
                    'type': 'input',
                    'name': 'version',
                    'message': 'Your project initial version',
                    'store': false,
                    'default': '0.1.0'
                },
                {
                    'type': 'input',
                    'name': 'author',
                    'message': 'author',
                    'store': true,
                    'default': this.user.git.name()
                },
                {
                    'type': 'input',
                    'name': 'email',
                    'message': 'email',
                    'store': true,
                    'default': this.user.git.email()
                }
            ],
            (answers) => {
                this.answers = answers;
                done();
            }
        );

    },

    writing() {

        const done = this.async();

        glob(
            '**/*',
            {
                cwd: this.sourceRoot(),
                dot: true
            },
            (err, files) => {

                if (err) {
                    this.log(`Error: ${err.message}`);
                    return;
                }

                files.forEach((file) => {

                    if (fs.statSync(this.templatePath(file)).isDirectory()) {
                        mkdirp(this.destinationPath(file));
                    }
                    else {
                        this.fs.copyTpl(
                            this.templatePath(file),
                            this.destinationPath(file),
                            this.answers
                        );
                    }

                });

                done();
            }
        );

    }

});
