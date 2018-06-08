load('/devices.js');
load('/widgets.js');

var widgetToTest = widgets.teamstats;
var widgetName = widgetToTest.name;

this.TeamstatsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'teamstats', {
    mainContainer: '.main-container',
    pitchingTab: '.player-category-toggle > div.toggle-container > div:nth-child(2)',
    eraHeader: '#shs-mlb-team-multi-stat > div > div.main-container > table > thead > tr > th.stat-container.earnedRunAverage'
  });
};

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(widgetToTest.url, '1920x1080');
    var teamstatsPage = new TeamstatsPage(driver);
    session.put('driver', driver);
    resize(driver, device.size);
    teamstatsPage.mainContainer.waitToBeShown('5s');
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    teamstatsPage.pitchingTab.clickAt(5, 5);
    teamstatsPage.eraHeader.waitToBeShown('5s');
    checkLayout(driver, 'specs/teamstats.pitching.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
