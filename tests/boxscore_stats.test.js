load('/devices.js');
load('/widgets.js');
var widgetToTest = widgets.boxscoreStats;

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1366x768');
  session.put('driver', driver);
});

forAll(devices, function() {
  test('Boxscore Stats Layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    resize(driver, device.size);
    checkLayout(driver, 'specs/boxscore_stats.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
