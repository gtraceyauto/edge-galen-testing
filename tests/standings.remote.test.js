load('/devices.js');
load('/widgets.js');
load('/remote-platforms.js');
load('/cloud-service.conf.js');

var widgetToTest = widgets.standings;
var widgetName = widgetToTest.name;

this.StandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#mlb-league-standings',
    divisionsContainer: '#mlb-league-standings > div:nth-child(3) > div.divisions'
  });
};

forAll(platforms, function() {
  forAll(devices, function() {
    test(widgetName + ' layout on ${deviceName} - ${browser} ${browserVersion} - ${os} ${osVersion}', function(platform, device) {
      var testName = widgetName + ' layout on ' + device.deviceName;
      var driver = createGridDriver(config.browserstack.url, {
        desiredCapabilities: {
          browser: platform.browser,
          browser_version: platform.browserVersion,
          os: platform.os,
          os_version: platform.osVersion,
          name: testName.toString(),
          'browserstack.debug': 'true'
        }
      });
      session.put('driver', driver);
      driver.get(widgetToTest.url);
      var standingsPage = new StandingsPage(driver);
      resize(driver, device.size);
      standingsPage.divisionsContainer.waitToBeShown('5s');
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
