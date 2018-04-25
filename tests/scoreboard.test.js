load('/devices.js');
load('/widgets.js');
var widgetToTest = widgets.scoreboard;
var widgetName = widgetToTest.name;

this.ScorecardPage = function(driver) {
  GalenPages.extendPage(this, driver, 'ScoreboardPage', {
    snapshotButton: ".game-section-container > div.game-section:nth-child(1) > div.event > div > div.event-body > div.event-card-buttons > div.scoreboard-button"
  });
};

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1920x1080');
  session.put('driver', driver);
});

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    var scorecardPage = new ScorecardPage(driver);
    resize(driver, device.size);
    scorecardPage.snapshotButton.waitToBeShown('2s');
    scorecardPage.snapshotButton.click();
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
