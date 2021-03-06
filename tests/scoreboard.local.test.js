load('/devices.js');
load('/widgets.js');

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

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(widgetToTest.url, '1920x1080');
    session.put('driver', driver);
    var scorecardPage = new ScorecardPage(driver);
    resize(driver, device.size);
    scorecardPage.snapshotButton.waitToBeShown('2s');
    scorecardPage.snapshotButton.clickAt(10, 10);
    if (scorecardPage.runnersOnBaseContainer.exists()) {
      scorecardPage.eventBodyBottom.waitToBeShown('5s');
    } else {
      scorecardPage.mlbPreview.waitToBeShown('5s');
    }
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
