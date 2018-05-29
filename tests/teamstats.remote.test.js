load('/devices.js');
load('/widgets.js');
load('/remote-platforms.js');
load('/cloud-service.conf.js');

var widgetToTest = widgets.teamstats;
var widgetName = widgetToTest.name;

this.TeamstatsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'teamstats', {
    mainContainer: '.main-container',
    pitchingTab: '.player-category-toggle > div.toggle-container > div:nth-child(2)'
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
