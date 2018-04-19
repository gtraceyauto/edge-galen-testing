load('/devices.js');
load('/widgets.js');
var widgetToTest = widgets.standings;

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1366x768');
  session.put('driver', driver);
});

forAll(devices, function() {
  test('Standings Layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    resize(driver, device.size);
    checkLayout(driver, 'specs/standings.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
