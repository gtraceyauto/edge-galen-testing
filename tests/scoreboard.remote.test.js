load('/devices.js');
load('/widgets.js');
load('/remote-platforms.js');
load('/cloud-service.conf.js');

var widgetToTest = widgets.scoreboard;
var widgetName = widgetToTest.name;

this.ScorecardPage = function(driver) {
  GalenPages.extendPage(this, driver, 'ScoreboardPage', {
    snapshotButton: '.game-section-container > div.game-section:nth-child(1) > div.event:nth-child(1) > div > div.event-body > div.event-card-buttons > div.scoreboard-button',
    runnersOnBaseContainer: '.runners-on-base-container',
    mlbPreview: '#mlb-game-preview',
    eventBodyBottom: '.event-body-bottom'
  });
};

forAll(platforms, function() {
  forAll(devices, function() {
    test(widgetName + ' layout on ${deviceName} - ${browser} - ${os}', function(platform, device) {
      var testName = widgetName + ' layout on ' + device.deviceName;
      var driver = createGridDriver(config.browserstack.url, {
        desiredCapabilities: {
          browser: platform.browser,
          os: platform.os,
          os_version: platform.osVersion,
          name: testName.toString(),
          'browserstack.debug': 'true'
        }
      });
      session.put('driver', driver);
      driver.get(widgetToTest.url);
      var scorecardPage = new ScorecardPage(driver);
      resize(driver, device.size);
      scorecardPage.snapshotButton.waitToBeShown('5s');
      scorecardPage.snapshotButton.clickAt(10, 10);
      if (scorecardPage.runnersOnBaseContainer.isDisplayed()) {
        scorecardPage.eventBodyBottom.waitToBeShown('5s');
      } else {
        scorecardPage.mlbPreview.waitToBeShown('5s');
      }
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
