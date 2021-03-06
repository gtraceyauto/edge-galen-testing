# Galen Layout Testing for Edge #

This repo contains a set of tests for Edge using the [Galen Framework](http://galenframework.com/) and Node.js.  They will test whether a Widget's layout conforms to a given spec sheet and produces highly readable and specific HTML reports.  Additionally the tests can be configured to run across various browser-OS-version combinations (defaults to Chrome), either locally or via the [Browserstack](http://www.browserstack.com) remote testing service.

### Prerequisites ###
* [Node.js](https://nodejs.org/en/)
* [Java](https://www.java.com/en/)
* [Git](https://git-scm.com/) - optional
* Chrome v65 or later

### Installation ###
* Download or clone this repo with Git.
* From the terminal:
    * Rebuild the project with `npm rb`.
    * Install the Galen Framework CLI with `npm install galenframework-cli -g`.
    * Install the Gulp Taskrunner CLI with `npm install gulp-cli -g`.

### Configuration ###
In order to run tests locally, in the `galen.config` file you will need to set the
`$.webdriver.chrome.driver` value to the path of a locally installed instance of Chromedriver.  There is one included in the project at `<path to project folder>/node_modules/chromedriver/lib/chromedriver/chromedriver`.  The terminal will also report the full path of this driver when you rebuild with `npm rb`.

### Running the tests ###
Tests are run using the [Gulp.js](https://gulpjs.com/) task runner.  Each test run will test a widget against it's corresponding .gspec file in the `specs` folder for the device resolutions defined in the `devices.js` file.

* Run the test with the command line: `gulp test -w=<widgetname> -l=<location>`.
    * `widgetname` is the widget to test.  Leaving this blank will run tests on all available widgets.  Currently available widgets are:
        * `teamstats`
        * `scoreboard`
        * `standings`

    * `location` is where to run the tests.  Leaving this blank will default to "local". Options are:
        * `local` - run the tests on your local computer using Chromedriver.
        * `remote` - run the tests on Browserstack w/ the browser-OS combinations defined in the `remote-plaforms.js` file.
        * `grid` - run the tests on a Selenium Grid (must be set up prior) w/ the browser-OS combinations defined in the `grid-platforms.js` file.

### Test reports ###
After the tests have run, type `gulp serve` in the terminal to serve html reports to http://<your-ip>:3333/ for easy viewing, until the process is stopped in terminal using `Ctrl-C`. They are also stored in the `reports` directory.  Tests can also be run and the reports served with one command: `gulp testAndReport -w=<widgetname> -l=<location>`.

### Who do I talk to? ###
* Tim Lantz (tlantz@stats.com)
