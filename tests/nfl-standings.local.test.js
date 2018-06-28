load('/devices.js');
load('/widgets.js');

var widgetToTest = widgets.nfl_standings;
var widgetName = widgetToTest.name;

this.NflStandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#shs-football-league-standings',
    divisionsContainer: '#shs-football-league-standings > div > div:nth-child(2) > div.divisions'
  });
};

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(widgetToTest.url, '1920x1080');
    session.put('driver', driver);
    var nflStandingsPage = new NflStandingsPage(driver);
    resize(driver, device.size);
    nflStandingsPage.divisionsContainer.waitToBeShown('10s');
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
