load('/devices.js');
load('/widgets.js');

var widgetToTest = widgets.multistat;
var widgetName = widgetToTest.name;

this.MultistatPage = function(driver) {
  GalenPages.extendPage(this, driver, 'multistat', {
    mainContainer: '.main-container',
    pitchingTab: '.player-category-toggle > div.toggle-container > div:nth-child(2)'
  });
};

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(widgetToTest.url, '1920x1080');
    var multistatPage = new MultistatPage(driver);
    session.put('driver', driver);
    resize(driver, device.size);
    multistatPage.mainContainer.waitToBeShown('2s');
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
    multistatPage.pitchingTab.clickAt(5, 5);
    GalenPages.sleep(1000);
    checkLayout(driver, 'specs/multistat.pitching.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
