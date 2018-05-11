load('/devices.js');
load('/widgets.js');
load('/grid-platforms.js');

var widgetToTest = widgets.standings;
var widgetName = widgetToTest.name;
var gridHubUrl = 'http://10.203.225.18:4444/wd/hub/';

this.StandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#mlb-league-standings',
    divisionsContainer: '#mlb-league-standings > div:nth-child(3) > div.divisions'
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
