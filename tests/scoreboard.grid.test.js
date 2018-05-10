load('/devices.js');
load('/widgets.js');
load('/grid-platforms.js');

var widgetToTest = widgets.scoreboard;
var widgetName = widgetToTest.name;
var gridHubUrl = 'http://10.203.225.105:4444/wd/hub/';

this.ScorecardPage = function(driver) {
  GalenPages.extendPage(this, driver, 'ScoreboardPage', {
    snapshotButton: '.game-section-container > div.game-section:nth-child(1) > div.event:nth-child(1) > div > div.event-body > div.event-card-buttons > div.scoreboard-button',
    mlbPreview: '#mlb-game-preview'
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
      var scorecardPage = new ScorecardPage(driver);
      resize(driver, device.size);
      scorecardPage.snapshotButton.waitToBeShown('5s');
      scorecardPage.snapshotButton.clickAt(10, 10);
      GalenPages.sleep(2000);
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
