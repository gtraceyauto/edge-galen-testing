load('/devices.js');
load('/widgets.js');
load('/grid-platforms.js');

var widgetToTest = widgets.teamstats;
var widgetName = widgetToTest.name;
var gridHubUrl = 'http://10.203.225.18:4444/wd/hub/';

this.TeamstatsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'teamstats', {
    mainContainer: '.main-container',
    pitchingTab: '.player-category-toggle > div.toggle-container > div:nth-child(2)'
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
      var teamstatsPage = new TeamstatsPage(driver);
      resize(driver, device.size);
      teamstatsPage.mainContainer.waitToBeShown('2s');
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
      teamstatsPage.pitchingTab.clickAt(5, 5);
      GalenPages.sleep(1000);
      checkLayout(driver, 'specs/teamstats.pitching.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
