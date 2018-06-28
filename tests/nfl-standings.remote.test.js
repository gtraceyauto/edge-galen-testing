load('/devices.js');
load('/widgets.js');
load('/remote-platforms.js');
load('/cloud-service.conf.js');

var widgetToTest = widgets.nfl_standings;
var widgetName = widgetToTest.name;

this.NflStandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#shs-football-league-standings',
    divisionsContainer: '#shs-football-league-standings > div > div:nth-child(2) > div.divisions'
  });
};

forAll(supportedPlatforms, function() {
  forAll(devices, function() {
    test(widgetName + ' layout on ${deviceName} - ${browser} ${browserVersion} - ${os} ${osVersion}', function(platform, device) {
      var testName = widgetName + ' layout on ' + device.deviceName;
      var driver = createGridDriver(config.browserstack.url, {
        desiredCapabilities: {
          browser: platform.browser,
          browser_version: platform.browserVersion,
          os: platform.os,
          os_version: platform.osVersion,
          name: testName.toString()
        }
      });
      session.put('driver', driver);
      driver.get(widgetToTest.url);
      var nflStandingsPage = new NflStandingsPage(driver);
      resize(driver, device.size);
      nflStandingsPage.divisionsContainer.waitToBeShown('10s');
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
