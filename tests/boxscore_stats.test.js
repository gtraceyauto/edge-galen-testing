load('/devices.js');
load('/widgets.js');
var widgetToTest = widgets.boxscoreStats;
var widgetName = widgetToTest.name;

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1366x768');
  session.put('driver', driver);
});

forAll(devices, function() {
  test('${widgetName} Layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    resize(driver, device.size);
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
