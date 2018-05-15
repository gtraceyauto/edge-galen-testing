# Galen Layout Testing for Widgets #

This repo contains a set of tests for Widgets using the [Galen Framework](http://galenframework.com/) and Node.js.  They will test whether a Widget's layout conforms to a given spec sheet and produces highly readable and specific HTML reports.  Additionally the tests can be configured to run across various browser-OS-version combinations (defaults to Chrome), either locally or via the [Browserstack](http://www.browserstack.com) remote testing service.

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
`$.webdriver.chrome.driver` value to the path of a locally installed instance of Chromedriver.  There is one included in the project @ `<path to project folder>/node_modules/chromedriver/lib/chromedriver/chromedriver`.  The terminal
will also report the full path of this driver when you rebuild with `npm rb`.

### Running the tests ###
Tests are run using the [Gulp.js](https://gulpjs.com/) task runner.
Available Widgets so far:
  * `multistat`
  * `scoreboard`
  * `standings`

* To run locally - `gulp test -w=<widgetname>`
    * Tests will be run on Chrome with desktop, tablet and mobile resolutions.
    * All available widgets can be run with just `gulp test`.

* To run on Browserstack - `gulp testRemote -w=<widgetname>`
    * Tests will be run on all browser/os configurations defined in `remote-platforms.js`.
    * All available widgets can be run with just `gulp testRemote`.

* To run on SeleniumGrid - `gulp testGrid -w=<widgetname>`
    * Tests will be run on all browser/os configurations defined in `grid-platforms.js`.
    * All available widgets can be run with just `gulp testGrid`.

### Test reports ###
After the tests have run, html reports will be served to (http://localhost:3333/), until the process is stopped in terminal using `Ctrl-C`. They are also stored in the `reports` directory.  Existing test reports can be re-served to localhost with `gulp serve`.

### Who do I talk to? ###
* Tim Lantz (tlantz@stats.com)
