load('/devices.js');
load('/widgets.js');
load('/grid-platforms.js');

var widgetToTest = widgets.nfl_standings;
var widgetName = widgetToTest.name;
var gridHubUrl = 'http://10.203.225.18:4444/wd/hub/';

this.NflStandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#shs-football-league-standings',
    divisionsContainer: '#shs-football-league-standings > div > div:nth-child(2) > div.divisions'
  });
};

forAll(platforms, function() {
  forAll(devices, function() {
    test(widgetName + ' layout on ${deviceName} - ${browser} - ${os}', function(platform, device) {
      var testName = widgetName + ' layout on ' + device.deviceName;
      var driver = createGridDriver(gridHubUrl, {
        desiredCapabilities: {
          browserName: platform.browser,
          platform: platform.os
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
