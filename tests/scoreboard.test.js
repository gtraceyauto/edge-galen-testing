load('/devices.js');
load('/widgets.js');
var widgetToTest = widgets.scoreboard;
var widgetName = widgetToTest.name;

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1920x1080');
  session.put('driver', driver);
});

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    resize(driver, device.size);
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
