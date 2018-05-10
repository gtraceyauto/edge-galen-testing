load('/devices.js');
load('/widgets.js');

var widgetToTest = widgets.standings;
var widgetName = widgetToTest.name;

this.StandingsPage = function(driver) {
  GalenPages.extendPage(this, driver, 'StandingsPage', {
    widgetContainer: '#mlb-league-standings'
  });
};

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(widgetToTest.url, '1920x1080');
    session.put('driver', driver);
    var standingsPage = new StandingsPage(driver);
    resize(driver, device.size);
    standingsPage.widgetContainer.waitToBeShown('5');
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
